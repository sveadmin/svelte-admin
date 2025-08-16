export function prepareJoiner(decimalSeparator: string = ',') : (value: any[]) => string | null {
  return (value: any[]) : string | null => {
    if (!value) {
      return null
    }
    if (!value[1]) {
      return value[0]
    }

    return value[0] + decimalSeparator + value[1]
  }
}