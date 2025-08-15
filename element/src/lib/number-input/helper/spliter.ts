export const prepareSplitter = (fractionDigits: number = 0) : (value: number ) => Array<string | null> => {
  return (value: number) : Array<string | null> => {
    if (!value) {
      return []
    }
    if (fractionDigits === 0) {
      return [value.toString()]
    }

    const valueAsString = value.toString()

    const decimalPosition = valueAsString.indexOf('.')
    if (decimalPosition === -1) {
      return [value.toString(), null]
    }

    const decimals = valueAsString.substring(0, decimalPosition),
      fractions = valueAsString.substring(decimalPosition + 1)
    return [decimals, fractions]
  }
}