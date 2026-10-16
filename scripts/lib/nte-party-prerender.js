import ts from 'typescript';

const PARTY_EXPORT = 'NTE_PARTY_COMBINATIONS';

// Read only the exported literal. Do not execute imports, fallback generation,
// function calls or any other statements from the authoring module.
function readLiteral(node) {
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
    return readLiteral(node.expression);
  }
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(readLiteral);
  if (ts.isObjectLiteralExpression(node)) {
    return Object.fromEntries(node.properties.map(property => {
      if (!ts.isPropertyAssignment(property) || !(
        ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)
      )) throw new Error(`${PARTY_EXPORT} must contain only literal properties`);
      return [property.name.text, readLiteral(property.initializer)];
    }));
  }
  throw new Error(`${PARTY_EXPORT} must contain only literal values`);
}

export function parseNtePartyCombinations(source) {
  const file = ts.createSourceFile('nte-parties.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let initializer;
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    if (!statement.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const declaration = statement.declarationList.declarations.find(item => ts.isIdentifier(item.name) && item.name.text === PARTY_EXPORT);
    if (declaration) {
      initializer = declaration.initializer;
      break;
    }
  }
  if (!initializer) throw new Error(`Missing ${PARTY_EXPORT} literal`);
  const parties = readLiteral(initializer);
  if (!Array.isArray(parties) || !parties.length) throw new Error(`${PARTY_EXPORT} must be a non-empty array`);
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
