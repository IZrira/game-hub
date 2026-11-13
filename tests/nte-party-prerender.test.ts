// @vitest-environment node
import fs from 'node:fs';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';
import { generateNtePartyBody, validateNteParties } from '../scripts/lib/nte-party-prerender.js';

const snapshot = JSON.parse(fs.readFileSync(new URL('../nte-hub/data/generated/parties.json', import.meta.url), 'utf8'));
const sitemap = fs.readFileSync(new URL('../public/sitemap-nte.xml', import.meta.url), 'utf8');
const routes = new Set(Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), match => new URL(match[1]).pathname));
const parties = validateNteParties(snapshot);
const memberCount = parties.reduce((sum, party) => sum + party.members.length, 0);
const substituteCount = parties.reduce((sum, party) => sum + party.members.reduce((n, member) => n + (member.substitutes?.length || 0), 0), 0);

describe('NTE party initial HTML', () => {
  it('builds the page from the admin DB snapshot the site uses', () => {
    expect(parties.length).toBeGreaterThan(0);
    expect(parties).toEqual(NTE_PARTY_COMBINATIONS);
    expect(new Set(parties.map(party => party.name)).size).toBe(parties.length);
    expect(new Set(parties.map(party => party.id)).size).toBe(parties.length);
  });

  it('preserves every party, member, role, description and substitute in source order', () => {
    const snapshot = JSON.stringify(parties);
    const $ = load(generateNtePartyBody(parties, routes));
    const sections = $('[data-nte-party]').toArray();
    expect(sections).toHaveLength(NTE_PARTY_COMBINATIONS.length);
    expect($('[data-nte-member]')).toHaveLength(memberCount);
    expect($('[data-nte-substitute]')).toHaveLength(substituteCount);
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
    expect(links).toHaveLength(memberCount + substituteCount + parties.length); // members, substitutes and each party's main character.
    links.forEach(link => {
      const href = $(link).attr('href')!;
      expect(href).toBe(`/gallery/nte/character/${encodeURIComponent($(link).text())}`);
      expect(routes.has(href)).toBe(true);
      expect(new URL(href, 'https://riragamehub.com').origin).toBe('https://riragamehub.com');
      expect(href).not.toContain('nte-');
    });
    const missing = load(generateNtePartyBody(parties, new Set()));
    expect(missing('a')).toHaveLength(0);
    expect(missing('[data-nte-member]').first().text()).toContain(`${parties[0].members[0].name} — ${parties[0].members[0].role}`);
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
    null,
    [],
    [{ name: 'x', description: 'x', members: [] }],
    [{ name: '', description: 'x', members: [{ name: 'a', role: '서포터' }] }],
    [{ name: 'x', description: 'x', members: [{ name: 'a', role: '서포터', substitutes: 'b' }] }],
  ])('fails closed instead of generating a thin empty page for unsupported data: %j', invalid => {
    expect(() => validateNteParties(invalid)).toThrow();
  });
});
