import {
  DateIntervalPieces,
} from '../types.js'

export const prepareSimpleIntervalDictionary = (
  prefix: ((isPastDate: boolean) => string),
  postfix: ((isPastDate: boolean) => string),
) : ((intervalPieces: DateIntervalPieces, isPastDate: boolean) => string) => {
  return (intervalPieces: DateIntervalPieces, isPastDate: boolean) : string => {
    const prefixString = prefix(isPastDate)
    const postfixString = postfix(isPastDate)

    switch (true) {
      case intervalPieces.seconds() < 2:
        return 'Now'
      case intervalPieces.seconds() < 60:
        return  + intervalPieces.seconds() + ' seconds' + postfixString
      case intervalPieces.minutes() < 2:
        return prefixString + '1 minute' + postfixString
      case intervalPieces.minutes() < 60:
        return prefixString + intervalPieces.minutes() + ' minutes' + postfixString
      case intervalPieces.hours() < 2:
        return prefixString + '1 hour' + postfixString
      case intervalPieces.hours() < 24:
        return prefixString + intervalPieces.hours() + ' hours' + postfixString
      case intervalPieces.days() < 2:
        return prefixString + '1 day' + postfixString
      case intervalPieces.days() < 7:
        return prefixString + intervalPieces.days() + ' days' + postfixString
      case intervalPieces.weeks() < 2:
        return prefixString + '1 week' + postfixString
      case intervalPieces.weeks() < 4:
        return prefixString + intervalPieces.weeks() + ' weeks' + postfixString
      case intervalPieces.months() < 2:
        return prefixString + '1 month' + postfixString
      case intervalPieces.months() < 12:
        return prefixString + intervalPieces.months() + ' months' + postfixString
      case intervalPieces.years() < 2:
        return prefixString + '1 year' + postfixString
      default:
        return prefixString + intervalPieces.years() + ' years' + postfixString
    }
  }
}
