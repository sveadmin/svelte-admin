export function validDateValidator () {
  return function (value: Date | string) {
    if (!value) {
      return 'Invalid date'
    }
    value = (value instanceof Date)
      ? value
      : new Date(value)
    return !isNaN(value.getTime()) || 'Invalid date'
  }
}