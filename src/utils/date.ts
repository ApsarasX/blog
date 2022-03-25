export function normalizeFormattedDate(formattedDate: string): string {
  const yearMarkIndex = formattedDate.indexOf('年');
  const monthMarkIndex = formattedDate.indexOf('月');
  const dayMarkIndex = formattedDate.indexOf('日');
  const yearStr = formattedDate.slice(0, yearMarkIndex);
  let monthStr = formattedDate.slice(yearMarkIndex + 1, monthMarkIndex);
  let dayStr = formattedDate.slice(monthMarkIndex + 1, dayMarkIndex);
  if (monthStr.length === 1) {
    monthStr = '0' + monthStr;
  }
  if (dayStr.length === 1) {
    dayStr = '0' + dayStr;
  }
  return `${yearStr}年${monthStr}月${dayStr}日`;
}
