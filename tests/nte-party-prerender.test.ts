// @vitest-environment node
import fs from 'node:fs';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';
import { generateNtePartyBody, parseNtePartyCombinations } from '../scripts/lib/nte-party-prerender.js';

const source = fs.readFileSync(new URL('../nte-hub/data/parties.ts', import.meta.url), 'utf8');
const sitemap = fs.readFileSync(new URL('../public/sitemap-nte.xml', import.meta.url), 'utf8');
const routes = new Set(Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), match => new URL(match[1]).pathname));
const parties = parseNtePartyCombinations(source);

describe('NTE party initial HTML', () => {
  it('extracts the exact six local parties without executing imports or fallback code', () => {
    expect(parties).toHaveLength(6);
    expect(parties).toEqual(NTE_PARTY_COMBINATIONS);
    expect(parties.map(party => party.name)).toEqual([
      '구원 령 속성 폭딜 파티', '민트 령 속성 제어 파티', '치즈 & 호토리 빛 속성 연계 파티',
      '호토리 빛 속성 광휘 파티', '아들러 주 속성 지원 파티', '라크리모사 암속성 제어 파티',
    ]);
    const guarded = `import unavailable from 'not-a-real-module';\nthrow new Error('must not execute');\n${source}\nthrow new Error('must not execute');`;
    expect(parseNtePartyCombinations(guarded)).toEqual(NTE_PARTY_COMBINATIONS);
  });

  it('preserves every party, member, role, description and substitute in source order', () => {
    const snapshot = JSON.stringify(parties);
    const $ = load(generateNtePartyBody(parties, routes));
    const sections = $('[data-nte-party]').toArray();
    expect(sections).toHaveLength(NTE_PARTY_COMBINATIONS.length);
    expect($('[data-nte-member]')).toHaveLength(24);
    expect($('[data-nte-substitute]')).toHaveLength(18);
    NTE_PARTY_COMBINATIONS.forEach((party, index) => {
      const section = $(sections[index]);
      expect(section.attr('data-nte-party')).toBe(party.id);
      expect(section.children('h3').text()).toBe(party.name);
      expect(section.children('p').first().text()).toBe(party.description);
      expect(section.text()).toContain(`분류: ${party.category}`);
      expect(section.text()).toContain(`주력 캐릭터: ${party.mainDPS}`);
      for (const [label, expected] of [['태그', party.tags], ['장점', party.pros], ['주의점', party.cons]] as const) {
        const heading = section.children('h4').filter((_, node) => $(node).text() === label);
        const values = heading.next('ul').children('li').toArray().map(node => $(node).text());
        expect(values).toEqual(expected || []);
      }
      const members = section.find('[data-nte-member]').toArray();
      expect(members).toHaveLength(party.members.length);
      party.members.forEach((member, memberIndex) => {
        const row = $(members[memberIndex]);
        expect(row.attr('data-nte-member')).toBe(member.id);
        expect(row.children('p').first().text()).toBe(`${member.name} — ${member.role} · ${member.attribute}`);
        const substitutes = row.find('[data-nte-substitute]').toArray();
        expect(substitutes).toHaveLength(member.substitutes?.length || 0);
        (member.substitutes || []).forEach((substitute, subIndex) => {
          expect($(substitutes[subIndex]).text()).toBe(`${substitute.name} — ${substitute.role}`);
        });
      });
    });
    expect(JSON.stringify(parties)).toBe(snapshot);
  });

  it('links only published NTE character names, never authoring IDs or external locations', () => {
    const $ = load(generateNtePartyBody(parties, routes));
    const links = $('a').toArray();
    expect(links).toHaveLength(48); // 24 members + 18 substitutes + 6 main characters.
    links.forEach(link => {
      const href = $(link).attr('href')!;
      expect(href).toBe(`/gallery/nte/character/${encodeURIComponent($(link).text())}`);
      expect(routes.has(href)).toBe(true);
      expect(new URL(href, 'https://riragamehub.com').origin).toBe('https://riragamehub.com');
      expect(href).not.toContain('nte-');
    });
    const missing = load(generateNtePartyBody(parties, new Set()));
    expect(missing('a')).toHaveLength(0);
    expect(missing('[data-nte-member]').first().text()).toContain('구원 — 메인 딜러');
  });

  it('escapes all editable text and refuses path traversal even if passed an unsafe route set', () => {
    const name = '../admin';
    const malicious = [{
      id: '"><script>alert(1)</script>', name: '<img src=x onerror=alert(1)>', description: '<script>bad()</script> & "quote"',
      mainDPS: name, category: '<iframe>', tags: ['<b>tag</b>'], pros: ['<svg/onload=bad()>'], cons: ['<a href=javascript:bad()>bad</a>'],
      members: [{ id: '" onclick="bad()', name, role: '<button onclick=bad()>', attribute: '<input>',
        substitutes: [{ name: 'javascript:bad()', role: '<img>' }] }],
    }];
    const html = generateNtePartyBody(malicious, new Set([`/gallery/nte/character/${encodeURIComponent(name)}`]));
    const $ = load(html);
    expect($('script,img,iframe,svg,button,input,a,[onclick],[onerror],[onload]')).toHaveLength(0);
    expect($('[data-nte-party]').attr('data-nte-party')).toBe(malicious[0].id);
    expect($('h3').text()).toBe(malicious[0].name);
    expect($('[data-nte-party]').children('p').first().text()).toBe(malicious[0].description);
    expect($.text()).toContain('<button onclick=bad()>');
    expect($.text()).toContain('javascript:bad()');
    expect(html).toContain('&amp; &quot;quote&quot;');
  });

  it.each([
    'export const NTE_PARTY_COMBINATIONS = getParties();',
    'export const NTE_PARTY_COMBINATIONS = [...otherParties];',
    'export const NTE_PARTY_COMBINATIONS = [{ name: call(), description: "x", members: [] }];',
    'export const NTE_PARTY_COMBINATIONS = [];',
    'export const NTE_PARTY_COMBINATIONS = [{ name: "x", description: "x", members: [] }];',
    'const NTE_PARTY_COMBINATIONS = [];',
    'export const unrelated = [];',
  ])('fails closed instead of generating a thin empty page for unsupported data: %s', invalid => {
    expect(() => parseNtePartyCombinations(invalid)).toThrow();
  });
});
