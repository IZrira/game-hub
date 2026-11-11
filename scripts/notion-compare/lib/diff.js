// Structural difference between two plain JSON values, reported per leaf path.
const show = v => (typeof v === 'string' ? v : JSON.stringify(v));

/**
 * Push `{path, a, b}` for every leaf where `a` and `b` differ. Arrays compare by position
 * (paths use 1-based `[n]`), objects by key. Missing values show as "(없음)".
 */
export function diffDeep(a, b, path, out, { ignore = [] } = {}) {
  if (ignore.some(re => re.test(path))) return out;
  if (JSON.stringify(a) === JSON.stringify(b)) return out;
  if (Array.isArray(a) || Array.isArray(b)) {
    const A = Array.isArray(a) ? a : [];
    const B = Array.isArray(b) ? b : [];
    for (let i = 0; i < Math.max(A.length, B.length); i++) diffDeep(A[i], B[i], `${path}[${i + 1}]`, out, { ignore });
    return out;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffDeep(a[k], b[k], path ? `${path}.${k}` : k, out, { ignore });
    return out;
  }
  out.push({ path, a: a === undefined ? '(없음)' : show(a), b: b === undefined ? '(없음)' : show(b) });
  return out;
}
