/** @param {unknown} value @param {number|string} [space] */
export function serializeJsonLd(value, space) {
  // JSON-LD is script raw text: HTML escaping would corrupt its values.
  return JSON.stringify(value, null, space)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
