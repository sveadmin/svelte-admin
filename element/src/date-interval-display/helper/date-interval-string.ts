export const prepareGetDateIntervalString = (
  prefix: ((diff: number) => string),
  postfix: ((diff: number) => string),
  secondsDenominator: number = 1000
): ((value: number, diff: number) => string) => {
  return (value: number, diff: number = 0) => {
    const seconds = value / secondsDenominator
    const minutes = seconds / 60
    const hours = minutes / 60
    const days = hours / 24
    const weeks = days / 7
    const months = days / 30
    const years = months / 12

  //TODO: make this based on dictionary

    switch (true) {
      case seconds < 2:
        return 'Now'
      case seconds < 60:
        return prefix(diff) + Math.floor(seconds) + ' seconds' + postfix(diff)
      case minutes < 2:
        return prefix(diff) + '1 minute' + postfix(diff)
      case minutes < 60:
        return prefix(diff) + Math.floor(minutes) + ' minutes' + postfix(diff)
      case hours < 2:
        return prefix(diff) + '1 hour' + postfix(diff)
      case hours < 24:
        return prefix(diff) + Math.floor(hours) + ' hours' + postfix(diff)
      case days < 2:
        return prefix(diff) + '1 day' + postfix(diff)
      case days < 7:
        return prefix(diff) + Math.floor(days) + ' days' + postfix(diff)
      case weeks < 2:
        return prefix(diff) + '1 week' + postfix(diff)
      case weeks < 4:
        return prefix(diff) + Math.floor(weeks) + ' weeks' + postfix(diff)
      case months < 2:
        return prefix(diff) + '1 month' + postfix(diff)
      case months < 12:
        return prefix(diff) + Math.floor(months) + ' months' + postfix(diff)
      case years < 2:
        return prefix(diff) + '1 year' + postfix(diff)
      default:
        return prefix(diff) + Math.floor(years) + ' years' + postfix(diff)
    }
  }
}