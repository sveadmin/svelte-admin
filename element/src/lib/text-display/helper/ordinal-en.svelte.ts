export function ordinalEn (store: number) : string {
  if (store < 0) {
    return ''
  }
  switch (store % 100) {
    case 11:
    case 12:
    case 13:
      return 'th'
  }
  switch (store % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}