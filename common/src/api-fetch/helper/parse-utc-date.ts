export function parseUtcDate(date: string) : Date {
  if (date.indexOf('+00:00') !== -1
    || date.indexOf('Z') !== -1) {
    return new Date(date)
  }
  return new Date(date + 'Z')
}