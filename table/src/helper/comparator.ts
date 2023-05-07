export const comparator = function (value : any) : string {
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }

  return value
}