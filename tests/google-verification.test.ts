import fs from 'node:fs';
import { expect, it } from 'vitest';
import { auditGoogleVerification, getGoogleVerificationTokens } from '../scripts/lib/google-verification.js';

const head = (content: string) => `<html><head>${content}</head><body></body></html>`;
const tag = '<meta name="google-site-verification" content="owner-token" />';

it('keeps the user-provided public ownership token in the source home head', () => {
  const html = fs.readFileSync('index.html', 'utf8');
  expect(getGoogleVerificationTokens(html)).toContain('xkdraGLy-ySTQ9wZ_wsJ3QwCxJo8yxLLi6NFJnIKMJQ');
});

it('accepts preserved verification, including an additional existing owner token', () => {
  expect(auditGoogleVerification(head(tag), head(`${tag}<meta content="other-owner" name="google-site-verification">`))).toEqual([]);
});

it.each([
  head(''),
  head('<meta name="google-site-verification" content="wrong-token">'),
  `<html><head></head><body>${tag}</body></html>`,
  head(`<script>const html = '${tag}';</script>`),
])('rejects verification missing from the server-rendered head: %s', html => {
  expect(auditGoogleVerification(head(tag), html)).toHaveLength(1);
});

it('rejects missing or blank source verification instead of silently disabling the audit', () => {
  expect(auditGoogleVerification(head(''), head(tag))).toHaveLength(1);
  expect(auditGoogleVerification(head('<meta name="google-site-verification" content=" ">'), head(tag))).toHaveLength(1);
});
