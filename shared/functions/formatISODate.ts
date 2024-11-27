export function formatISODate(dateString: string, locale = 'uk-UA') {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
