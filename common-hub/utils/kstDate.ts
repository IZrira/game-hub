/** Supabase 시각(UTC)을 한국 시간 기준 날짜(YYYY-MM-DD)로 바꾼다. 자정~오전 9시 글이 하루 이르게 보이지 않게 한다. */
export const toKstDate = (value?: string | null): string => {
  if (!value) return '';
  const time = Date.parse(value);
  if (Number.isNaN(time)) return String(value).split('T')[0];
  return new Date(time + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
};
