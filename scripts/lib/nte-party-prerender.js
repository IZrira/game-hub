// NTE party data comes from the admin DB snapshot (nte-hub/data/generated/parties.json).
// Refuse a missing or malformed list so the build never ships a thin, empty party page.
export function validateNteParties(parties) {
  if (!Array.isArray(parties) || !parties.length) throw new Error('NTE parties must be a non-empty array');
  for (const party of parties) {
    if (!party || typeof party.name !== 'string' || !party.name.trim() || typeof party.description !== 'string'
      || !Array.isArray(party.members) || !party.members.length) throw new Error('Invalid NTE party data');
    for (const member of party.members) {
      if (!member || typeof member.name !== 'string' || !member.name.trim() || typeof member.role !== 'string'
        || (member.substitutes !== undefined && !Array.isArray(member.substitutes))) throw new Error('Invalid NTE party member');
      for (const substitute of member.substitutes || []) {
        if (!substitute || typeof substitute.name !== 'string' || !substitute.name.trim()
          || (substitute.role !== undefined && typeof substitute.role !== 'string')) throw new Error('Invalid NTE party substitute');
      }
    }
  }
  return parties;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

export function generateNtePartyBody(parties, characterRoutes = new Set()) {
  const characterLink = name => {
    const label = escapeHtml(name);
    // Names are labels, never URLs. Missing/unpublished characters stay text.
    if (typeof name !== 'string' || !name.trim() || /[\u0000-\u001f\u007f/\\?#]/.test(name) || name === '.' || name === '..') return label;
    const route = `/gallery/nte/character/${encodeURIComponent(name)}`;
    return characterRoutes.has(route) ? `<a href="${escapeHtml(route)}">${label}</a>` : label;
  };
  const list = (label, values) => Array.isArray(values) && values.length
    ? `<h4>${escapeHtml(label)}</h4><ul>${values.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '';
  const sections = parties.map(party => {
    const members = party.members.map(member => {
      const substitutes = member.substitutes?.length
        ? `<p>대체 캐릭터</p><ul>${member.substitutes.map(substitute => `<li data-nte-substitute>${characterLink(substitute.name)}${substitute.role ? ` — ${escapeHtml(substitute.role)}` : ''}</li>`).join('')}</ul>` : '';
      return `<li data-nte-member="${escapeHtml(member.id)}"><p>${characterLink(member.name)} — ${escapeHtml(member.role)}${member.attribute ? ` · ${escapeHtml(member.attribute)}` : ''}</p>${substitutes}</li>`;
    }).join('');
    return `<section data-nte-party="${escapeHtml(party.id)}"><h3>${escapeHtml(party.name)}</h3><p>${escapeHtml(party.description)}</p>${party.category ? `<p><strong>분류:</strong> ${escapeHtml(party.category)}</p>` : ''}${party.mainDPS ? `<p><strong>주력 캐릭터:</strong> ${characterLink(party.mainDPS)}</p>` : ''}${list('태그', party.tags)}<h4>멤버와 역할</h4><ul>${members}</ul>${list('장점', party.pros)}${list('주의점', party.cons)}</section>`;
  }).join('\n');
  return `<h2>등록된 추천 파티 ${parties.length}개</h2>\n${sections}`;
}
