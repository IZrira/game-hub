import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import LocationFieldNotes from '../aniimo-hub/components/LocationFieldNotes';
import { getLocationFieldNotes, getLocationNotePath, renderLocationFieldNotes } from '../aniimo-hub/data/locationFieldNotes.js';
import { INDEXABLE_AND_APP_PATHS } from '../functions/generated-routes';
import catalog from '../aniimo-hub/data/aniimo.json';

const fragment = (html: string) => {
  const root = document.createElement('div');
  root.innerHTML = html;
  return root;
};
const content = (html: string) => [...fragment(html).querySelectorAll('h2,h3,p,a')]
  .map(element => [element.tagName, element.textContent, element.getAttribute('href')]);

describe('verified Aniimo habitat field notes', () => {
  it.each(['청석 대지', '늑대이빨 능선'])('keeps %s app and initial HTML content and form links identical', habitat => {
    const app = renderToStaticMarkup(<MemoryRouter><LocationFieldNotes habitat={habitat} /></MemoryRouter>);
    const initial = renderLocationFieldNotes(habitat);
    expect(content(app)).toEqual(content(initial));
    expect(fragment(app).querySelector('section')?.getAttribute('aria-labelledby')).toBe('location-field-notes-title');
    expect(fragment(app).querySelector('#location-field-notes-title')).toBeTruthy();
    const notes = getLocationFieldNotes(habitat)!;
    for (const entry of notes.entries) {
      for (const link of entry.links) {
        const creature = catalog.find(item => item.name === link.name);
        expect(creature, link.name).toBeTruthy();
        expect(creature!.forms.some(form => form.key === link.formKey), `${link.name}/${link.formKey}`).toBe(true);
        const path = getLocationNotePath(link);
        expect(INDEXABLE_AND_APP_PATHS.has(decodeURIComponent(path.split('?')[0])), path).toBe(true);
        expect(new URL(path, 'https://riragamehub.com').searchParams.get('form')).toBe(link.formKey === 'basic-form' ? null : link.formKey);
      }
    }
  });

  it.each(['뇌전의 숲', '설산기슭 초원', '__proto__', '없는 지역'])('does not invent notes for %s', habitat => {
    expect(getLocationFieldNotes(habitat)).toBeUndefined();
    expect(renderLocationFieldNotes(habitat)).toBe('');
    expect(renderToStaticMarkup(<LocationFieldNotes habitat={habitat} />)).toBe('');
  });

  it('does not copy first-region guidance into another region with the same name', () => {
    expect(getLocationFieldNotes('청석 대지', '300301')).toBeUndefined();
    expect(renderLocationFieldNotes('청석 대지', '300301')).toBe('');
    expect(renderToStaticMarkup(<LocationFieldNotes habitat="청석 대지" regionId="300301" />)).toBe('');
  });

  it('keeps sibling mature stages separate from an invented linear evolution', () => {
    const examples = [['풀크랩', '스탈크랩'], ['록볼볼', '모터터'], ['이글랑', '헬울프']];
    for (const [name, sibling] of examples) {
      const form = catalog.find(entry => entry.name === name)!.forms.find(form => form.key === 'basic-form')!;
      const stages = new Map(form.evolution.map(node => [node.name, node.stage]));
      expect(stages.get(name)).toBe('성숙기');
      expect(stages.get(sibling)).toBe('성숙기');
    }
    expect(renderLocationFieldNotes('청석 대지') + renderLocationFieldNotes('늑대이빨 능선')).not.toContain('→');
  });
});
