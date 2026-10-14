import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MemoryRouter } from 'react-router';
import {
  isNotionUrl,
  sanitizePublicGuideData,
  sanitizePublicGuideText,
} from '../common-hub/utils/publicGuideLinks';
import { HSR_CHARACTER_GUIDES } from '../hsr-hub/data/guides';
import wwGuides from '../ww-hub/data/generated/guides.json';
import articles from '../common-hub/data/guideArticles.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';
import { GuideEquipmentCard, GuideHero } from '../common-hub/components/guides/GuideLayout';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));

describe('public guide link policy', () => {
  it.each([
    'https://notion.so/character',
    'http://www.notion.so/character',
    'https://app.notion.com/p/workspace/character?source=copy_link',
    'https://notion.com/character',
    'https://www.notion.com/character',
    'https://workspace.notion.site/character',
    'https://notion.site/character',
    'https://a.b.notion.site/character',
    'HTTPS://APP.NOTION.COM/character',
    'https://notion.so.:443/character',
    '//app.notion.com/character',
    '//workspace.notion.site/character',
  ])('recognizes a Notion destination: %s', url => {
    expect(isNotionUrl(url)).toBe(true);
  });

  it.each([
    undefined,
    '',
    '/gallery/hsr/character/feixiao/guide',
    '#equipment',
    'https://riragamehub.com/gallery/nte/guides/raven',
    'https://evilnotion.so/character',
    'https://notion.so.example.com/character',
    'https://notion.site.example.com/character',
    'https://example.com/notion.so/character',
    'https://example.com/?next=notion.com',
    'https://notion.so@example.com/character',
  ])('preserves a destination outside the Notion hosts: %s', url => {
    expect(isNotionUrl(url)).toBe(false);
  });

  it('keeps explanatory link labels and surrounding guide information', () => {
    const text = '공격력 4000 이상. [추가 세팅 설명](https://app.notion.com/p/workspace/character) 이후 치명타 확률 80% 이상.';
    const result = sanitizePublicGuideText(text);

    expect(result).toContain('추가 세팅 설명');
    expect(result).toContain('공격력 4000 이상.');
    expect(result).toContain('치명타 확률 80% 이상.');
    expect(result).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(result).not.toContain('[](');
  });

  it('removes bare, autolink and URL-labelled destinations, including protocol-relative ones', () => {
    const text = [
      '조건: 속도 134 이상',
      'https://www.notion.so/source?source=copy_link',
      '<https://workspace.notion.site/private>',
      '[https://app.notion.com/private](https://app.notion.com/private)',
      '//app.notion.com/private',
      'www.notion.so/private',
      'notion.site/private',
      '후속 조건: 에너지 회복 효율 119.4%',
    ].join('\n');
    const result = sanitizePublicGuideText(text);

    expect(result).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(result).toContain('조건: 속도 134 이상');
    expect(result).toContain('후속 조건: 에너지 회복 효율 119.4%');
  });

  it('does not render Notion destinations from reference links or images', () => {
    const text = [
      '[참고 세팅][private]',
      '',
      '[private]: https://app.notion.com/private "비공개 자료"',
      '',
      '![원본 이미지](https://workspace.notion.site/image.png)',
      '',
      '[캐릭터 도감](/gallery/ww?menu=캐릭터)',
      '',
      '[일반 링크](https://example.com/guide)',
      '',
      '![장비 이미지](https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/weapon.webp)',
    ].join('\n');
    const sanitized = sanitizePublicGuideText(text);
    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, sanitized));

    expect(sanitized).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(html).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(html).toContain('참고 세팅');
    expect(decodeURI(html)).toContain('href="/gallery/ww?menu=캐릭터"');
    expect(html).toContain('href="https://example.com/guide"');
    expect(html).toContain('src="https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/weapon.webp"');
  });

  it('preserves ordinary links, internal paths and gameplay text exactly', () => {
    const text = [
      'Notion에서 관리한 공략도 추천 수치는 같습니다.',
      '치명타 확률 80% 이상 / 속도 134 / 재련 1단계',
      '[광추 설명](/gallery/hsr/lightcone/흘러가는%20강가를%20따라)',
      '[일반 링크](https://example.com/guide?ref=notion.so)',
      '[도메인 이름이 다른 링크](https://notion.so.example.com/guide)',
      '![무기](https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/weapon.webp)',
    ].join('\n');

    expect(sanitizePublicGuideText(text)).toBe(text);
    expect(sanitizePublicGuideText(sanitizePublicGuideText(text))).toBe(text);
  });

  it('preserves bare addresses whose full host is outside Notion', () => {
    const text = 'notion.so.example.com/guide\nnotion.site.example.com/guide\nnotion.company/guide';
    expect(sanitizePublicGuideText(text)).toBe(text);
  });

  it.each([
    '[설명](https://app&#46;notion&#46;com/private)',
    '[설명](https://app\\.notion\\.com/private)',
    '[설명](<https://app.notion.com/private>)',
    '[설명][private]\n\n[private]: https://workspace&#x2e;notion&#x2e;site/private',
  ])('hides URLs that Markdown normalizes before rendering: %s', text => {
    const html = renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, sanitizePublicGuideText(text)));
    expect(html).toContain('설명');
    expect(html).not.toContain('<a ');
    expect(html).not.toMatch(/notion\.(?:so|com|site)/i);
  });

  it('sanitizes nested presentation records without changing the source or stat relationships', () => {
    const source = Object.freeze({
      name: '레이븐',
      choices: Object.freeze([
        Object.freeze({ name: '기본 세팅', rank: 1, note: '[설명](https://app.notion.com/private)' }),
        Object.freeze({ name: '대안 세팅', rank: 2, note: '주 옵션은 치명 확률 40% 이상' }),
      ]),
      target: Object.freeze({ value: '45% 이상', enabled: true, alternate: null }),
      link: '/gallery/nte/character/레이븐',
      absent: undefined,
    });
    const original = JSON.stringify(source);
    const result = sanitizePublicGuideData(source);

    expect(JSON.stringify(source)).toBe(original);
    expect(result.name).toBe(source.name);
    expect(result.choices.map(choice => choice.rank)).toEqual([1, 2]);
    expect(result.choices[0].note).toContain('설명');
    expect(JSON.stringify(result)).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(result.choices[1]).toEqual(source.choices[1]);
    expect(result.target).toEqual(source.target);
    expect(result.link).toBe(source.link);
    expect(result.absent).toBeUndefined();
  });

  it('does not publish Notion link or image destinations in shared guide cards', () => {
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, {},
      React.createElement(GuideEquipmentCard, {
        name: '추천 장비',
        image: 'https://app.notion.com/private-image.png',
        to: 'https://workspace.notion.site/private',
        rank: 1,
      }),
    ));

    expect(html).toContain('추천 장비');
    expect(html).not.toContain('<a ');
    expect(html).not.toContain('<img ');
    expect(html).not.toMatch(/notion\.(?:so|com|site)/i);
  });

  it('hides Notion addresses in shared hero text and accessible image descriptions', () => {
    const html = renderToStaticMarkup(React.createElement(MemoryRouter, {},
      React.createElement(GuideHero, {
        name: '레이븐 https://app.notion.com/private',
        image: 'https://example.com/character.webp',
        backTo: '/gallery/nte/character/레이븐',
        description: '치명 확률 40% 이상 https://notion.so/private',
        version: '1.0 https://workspace.notion.site/private',
        updatedAt: '2026-10-14 https://app.notion.com/private',
      }),
    ));

    expect(html).toContain('레이븐');
    expect(html).toContain('치명 확률 40% 이상');
    expect(html).toContain('href="/gallery/nte/character/레이븐"');
    expect(html).toContain('src="https://example.com/character.webp"');
    expect(html).not.toMatch(/notion\.(?:so|com|site)/i);
  });

  it('hides private URLs at the actual HSR, WW and analysis prerender loading boundaries', () => {
    const sourceText = readFileSync(path.resolve(process.cwd(), 'scripts/prerender-meta.js'), 'utf8');
    const source = ts.createSourceFile('prerender-meta.js', sourceText, ts.ScriptTarget.ES2022, true, ts.ScriptKind.JS);
    const declarations = source.statements.filter(statement =>
      (ts.isFunctionDeclaration(statement) && ['loadHsrGuidesMap', 'loadWwGuidesMap'].includes(statement.name?.text || '')) ||
      (ts.isVariableStatement(statement) && statement.declarationList.declarations.some(declaration => declaration.name.getText(source) === 'wwGuideAnalysis')),
    );
    expect(declarations).toHaveLength(3);

    const hsrFixture = {
      characterName: 'Fixture',
      targetStats: [{ label: '속도', value: '134 이상', note: '[추가 조건](https://app.notion.com/private)' }],
    };
    const wwFixture = Object.freeze({
      id: 'fixture', name: 'Fixture', dbSource: 'ww_guides',
      weapons: [{ rank: 1, name: '무기', note: '공격력 4000 이상 https://notion.so/private' }],
    });
    const analysisFixture = {
      fixture: { summary: '운용 조건 https://workspace.notion.site/private', gameplay: { tips: ['속도 134 이상'] } },
    };
    const original = JSON.stringify({ hsrFixture, wwFixture, analysisFixture });
    const output = runInNewContext(
      `${declarations.map(statement => statement.getText(source)).join('\n')}\n({ hsr: loadHsrGuidesMap(), ww: loadWwGuidesMap(), analysis: wwGuideAnalysis });`,
      {
        HSR_GUIDE_DIR: 'fixture-guides',
        WW_GUIDE_ANALYSIS_FILE: 'fixture-analysis.json',
        path,
        sanitizePublicGuideData,
        getNotionData: () => [wwFixture],
        fs: {
          existsSync: () => true,
          readdirSync: () => ['fixture.ts'],
          readFileSync: (filename: string) => filename === 'fixture-analysis.json'
            ? JSON.stringify(analysisFixture)
            : `export const FixtureGuide: CharacterGuide = ${JSON.stringify(hsrFixture)};`,
        },
      },
    );

    expect(output.hsr.get('Fixture')?.targetStats[0]).toEqual({ label: '속도', value: '134 이상', note: '추가 조건' });
    expect(output.ww.get('fixture')?.weapons[0].rank).toBe(1);
    expect(output.ww.get('fixture')?.weapons[0].note).toContain('공격력 4000 이상');
    expect(output.analysis.fixture.summary).toContain('운용 조건');
    expect(output.analysis.fixture.gameplay.tips).toEqual(['속도 134 이상']);
    expect(JSON.stringify([output.hsr.get('Fixture'), output.ww.get('fixture'), output.analysis])).not.toMatch(/notion\.(?:so|com|site)/i);
    expect(JSON.stringify({ hsrFixture, wwFixture, analysisFixture })).toBe(original);
  });

  it('preserves the current HSR and WW guide values and all NTE parsed recommendations', () => {
    expect(sanitizePublicGuideData(HSR_CHARACTER_GUIDES)).toEqual(HSR_CHARACTER_GUIDES);
    expect(sanitizePublicGuideData(wwGuides)).toEqual(wwGuides);

    const nteGuides = articles.filter(article => article.gameId === 'nte' && 'notionPageId' in article);
    expect(nteGuides.length).toBeGreaterThan(0);
    for (const article of nteGuides) {
      const original = parseNteCharacterGuide(article.content);
      const sanitized = parseNteCharacterGuide(sanitizePublicGuideText(article.content));
      expect(sanitized, article.title).toEqual(original);
    }
  });
});
