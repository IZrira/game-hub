// Line-level difference for long Markdown bodies (guides), grouped into hunks.

const clean = s => String(s ?? '').replace(/\r\n?/g, '\n').split('\n').map(l => l.replace(/\s+$/, ''));
const headingOf = line => (line.match(/^#{1,6}\s+(.*)$/) || [])[1]?.replace(/[*_`]/g, '').trim();

/**
 * Compare `a` (site) and `b` (Notion) line by line. Returns hunks `{a, b, heading, n}`:
 * the changed lines on each side, the nearest heading above them in `a`, and the hunk's 1-based
 * number under that heading (so labels stay stable when other sections change).
 */
export function lineHunks(a, b) {
  const A = clean(a);
  const B = clean(b);
  const n = A.length;
  const m = B.length;
  const dp = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hunks = [];
  let cur = null;
  let heading = '';
  const perHeading = new Map();
  const flush = () => {
    if (!cur) return;
    const count = (perHeading.get(cur.heading) || 0) + 1;
    perHeading.set(cur.heading, count);
    hunks.push({ a: cur.a.join('\n').trim(), b: cur.b.join('\n').trim(), heading: cur.heading, n: count });
    cur = null;
  };
  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && A[i] === B[j]) {
      flush();
      heading = headingOf(A[i]) || heading;
      i++; j++;
    } else if (j >= m || (i < n && dp[i + 1][j] >= dp[i][j + 1])) {
      cur = cur || { a: [], b: [], heading };
      cur.a.push(A[i]); i++;
    } else {
      cur = cur || { a: [], b: [], heading };
      cur.b.push(B[j]); j++;
    }
  }
  flush();
  return hunks.filter(h => h.a.replace(/\s+/g, '') !== h.b.replace(/\s+/g, ''));
}
