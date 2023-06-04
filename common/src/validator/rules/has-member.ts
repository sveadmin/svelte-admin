const ERROR_MESSAGE = 'At least one member is required'

export function hasMemberValidator () {
  return function (value: any[] | {}) {
    if (typeof value.length === 'number') {
      return value.length > 0 || ERROR_MESSAGE
    }
    const elements = Object.keys(value)
    return elements.length > 0 || ERROR_MESSAGE
  }
}