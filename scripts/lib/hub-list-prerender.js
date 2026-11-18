// Initial HTML for the HSR·WW tier list and party pages, built from the admin DB snapshots
// (hsr-hub/data/generated, ww-hub/data/generated). These pages used to ship only a short
// guide text, so crawlers saw them as thin. The real rows are rendered here instead.

function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// `routeFor(name)` returns a published character route or nothing; unknown names stay text.
function characterLabel(name, routeFor) {
  const label = escapeHtml(name);
  const route = typeof name === 'string' && name.trim() ? routeFor(name.trim()) : null;
  return route ? `<a href="${escapeHtml(route)}">${label}</a>` : label;
}

export function generatePartyListBody(parties, routeFor) {
  const valid = (Array.isArray(parties) ? parties : [])
    .filter(party => party && typeof party.name === 'string' && party.name.trim() && Array.isArray(party.members) && party.members.length);
  if (!valid.length) return '';
  const list = (label, values) => Array.isArray(values) && values.length
    ? `<h4>${escapeHtml(label)}</h4><ul>${values.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '';
  const sections = valid.map(party => {
    const members = party.members.filter(member => member && member.name).map(member => {
      const substitutes = Array.isArray(member.substitutes) && member.substitutes.length
        ? ` (대체: ${member.substitutes.filter(item => item && item.name).map(item => `${characterLabel(item.name, routeFor)}${item.breakthrough ? ` ${escapeHtml(item.breakthrough)}` : ''}`).join(', ')})` : '';
      return `<li>${characterLabel(member.name, routeFor)}${member.role ? ` — ${escapeHtml(member.role)}` : ''}${substitutes}</li>`;
    }).join('');
    return `<section><h3>${escapeHtml(party.name)}</h3>${party.description ? `<p>${escapeHtml(party.description)}</p>` : ''}${party.category ? `<p><strong>분류:</strong> ${escapeHtml(party.category)}</p>` : ''}${party.mainDPS ? `<p><strong>주력 캐릭터:</strong> ${characterLabel(party.mainDPS, routeFor)}</p>` : ''}<h4>멤버와 역할</h4><ul>${members}</ul>${list('장점', party.pros)}${list('주의점', party.cons)}</section>`;
  }).join('\n');
  return `<h2>등록된 추천 파티 ${valid.length}개</h2>\n${sections}`;
}

// `categories` is [{ id, name, description }] in display order; `tiers` maps a category id to tier rows.
export function generateTierListBody(categories, tiers, routeFor) {
  const sections = (Array.isArray(categories) ? categories : []).map(category => {
    const rows = Array.isArray(tiers?.[category.id]) ? tiers[category.id] : [];
    const filled = rows.filter(row => row && Array.isArray(row.characters) && row.characters.length);
    if (!filled.length) return '';
    const total = filled.reduce((sum, row) => sum + row.characters.length, 0);
    const rowHtml = filled.map(row => {
      const characters = row.characters.filter(item => item && item.name)
        .map(item => `${characterLabel(item.name, routeFor)}${item.role ? `(${escapeHtml(item.role)})` : ''}`).join(', ');
      return `<li><strong>${escapeHtml(row.label || row.tier)} 티어</strong> — ${characters}</li>`;
    }).join('');
    return `<section><h3>${escapeHtml(category.name)}${category.description ? ` · ${escapeHtml(category.description)}` : ''}</h3><p>평가 캐릭터 ${total}명</p><ul>${rowHtml}</ul></section>`;
  }).filter(Boolean);
  return sections.length ? `<h2>콘텐츠별 티어</h2>\n${sections.join('\n')}` : '';
}
