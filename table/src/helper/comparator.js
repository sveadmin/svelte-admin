export const comparator = function (value) {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return value
}