export function getDecimalFractionRatio(
  a: string | number | undefined,
  b: string | number | undefined
) : number | undefined {
  if (a === undefined) {
    return a
  }
  if (b === undefined) {
    return 12
  }

  const aInt = (typeof a === 'string') ? parseInt(a) : a,
    bInt = (typeof b === 'string') ? parseInt(b) : b

  if (aInt + bInt === 12) {
    return aInt
  }

  return Math.round(aInt * 12 / (aInt + bInt))
}