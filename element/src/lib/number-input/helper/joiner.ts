export function joiner(value: any[]) : number | null {
  if (!value) {
    return null
  }
  if (!value[1]) {
    return parseInt(value[0])
  }

  return parseFloat(value[0] + '.' + value[1])
}