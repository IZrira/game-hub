/** Local analysis is published only against the exact reviewed source revision. */
export function attachNteGuideAnalysis(article, records) {
  const record = article.gameId === 'nte' ? records[article.slug] : undefined;
  if (!record || article.status !== 'published' || record.analysis?.status !== 'published'
    || record.characterId !== article.characterId
    || record.applicableVersion !== article.applicableVersion
    || record.sourceReviewedAt !== article.reviewedAt
    || record.sourceContent !== article.content) return article;
  return {
    ...article,
    analysis: record.analysis,
    reviewedAt: [article.reviewedAt, record.analysis.reviewedAt].sort().at(-1),
  };
}

/** escape is the same HTML-escaping function used by the surrounding prerender. */
export function renderNteGuideAnalysis(analysis, escape) {
  if (analysis?.status !== 'published') return '';
  const list = (title, items) => items?.length
    ? `<h3>${escape(title)}</h3><ul>${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : '';
  const teams = analysis.teams?.length
    ? `<h3>추천 파티</h3><ul>${analysis.teams.map(team => `<li>${escape(team.label)}: ${team.slots.map(slot => slot.map(escape).join(' 또는 ')).join(' · ')}</li>`).join('')}</ul>` : '';
  const gear = analysis.gear?.length
    ? `<h3>장비 선택 근거</h3><ul>${analysis.gear.map(item => `<li>${escape(item.name)}${item.note ? ` (${escape(item.note)})` : ''}: ${escape(item.reason)}</li>`).join('')}</ul>` : '';
  const targets = analysis.targets?.rows?.length
    ? `<h3>육성 목표</h3><ul>${analysis.targets.rows.map(row => `<li>${escape(row.label)}: ${row.values.map((value, index) => `${escape(analysis.targets.columns[index] || '')} ${escape(value)}`).join(' · ')}</li>`).join('')}</ul>` : '';
  return `<section id="rira-analysis"><h2>RIRA 캐릭터 분석</h2>`
    + `<p>역할: ${escape(analysis.role)} · 분석 기준: ${escape(analysis.standard)} · 검토: ${escape(analysis.reviewedAt)}</p>`
    + `<h3>RIRA 한줄평</h3><p>${escape(analysis.summary)}</p>`
    + teams
    + `<h3>파티 구성 원리</h3><p>${escape(analysis.teamPrinciple)}</p>`
    + `<h3>기본 운용법</h3><p>${escape(analysis.gameplay.overview)}</p>`
    + `<h3>운용 순서</h3><ol>${analysis.gameplay.rotation.map(step => `<li>${escape(step)}</li>`).join('')}</ol>`
    + gear + targets
    + list('장점', analysis.strengths) + list('주의점', analysis.weaknesses)
    + list('운용 핵심', analysis.gameplay.tips) + '</section>';
}
