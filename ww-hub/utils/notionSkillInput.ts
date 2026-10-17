/** Split only standalone authoring headings, preserving the actual game text. */
export function parseNotionSkillInput(source: string) {
  const normalized = source.replace(/\r\n?/g, '\n')
    .replace(/^스킬 입력 가이드[^\n]*\n?/i, '')
    .replace(/\[공명 회로 게이지 이미지(\d*)(?:\.webp)?\]/g, '[공명 회로 게이지$1.webp]');
  const lines = normalized.split('\n');
  const isInputHeading = (line: string) => /^(?:메커니즘 설명|조작 입력)(?:\s+소제목)?$/.test(
    line.trim().replace(/^#{1,6}\s*/, '')
      .replace(/^(?:\*\*|__)/, '').replace(/(?:\*\*|__)$/, '').trim()
  );
  const boundary = lines.findIndex(isInputHeading);
  const paragraphs = (text: string) => text.replace(/(?<!\n)\n(?!\n)/g, '\n\n').trim();
  return {
    overview: paragraphs((boundary < 0 ? lines : lines.slice(0, boundary)).join('\n')),
    extractedInputs: boundary < 0 ? [] : paragraphs(lines.slice(boundary + 1).filter(line => !isInputHeading(line)).join('\n'))
      .split(/\n\s*\n/).map(line => line.trim()).filter(Boolean),
  };
}

/** Repair only missing legacy translation references, using matching Notion skills. */
export function repairNotionSkillReferences(existing: any, skills: any[], translations: Record<string, unknown>) {
  const missing = (value: unknown) => typeof value === 'string' && value.startsWith('character.') && !translations[value];
  const additionalAbilities = existing.additionalAbilities?.map((ability: any, index: number) => {
    const source = skills.find(skill => skill.id === `notion_inherentSkill${index + 1}`);
    return {
      ...ability,
      name: missing(ability.name) && source?.name ? source.name : ability.name,
      description: missing(ability.description) && source?.description ? source.description : ability.description,
    };
  });
  const harmony = skills.find(skill => skill.id === 'notion_harmonyBreak');
  const concertDissipation = missing(existing.concertDissipation?.description) && harmony?.description
    ? { ...existing.concertDissipation, name: harmony.name, description: harmony.description }
    : existing.concertDissipation;
  return { ...(additionalAbilities ? { additionalAbilities } : {}), ...(concertDissipation ? { concertDissipation } : {}) };
}
