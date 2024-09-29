import {
  DateIntervalDictionary,
} from '../types.js'

import {
  prepareSimpleIntervalDictionary,
} from './simple-interval-dictionary.js'

import {
  dateIntervalPieces,
} from './date-interval-pieces.js'

export const prepareGetDateIntervalString = (
  dateIntervalDictionary: DateIntervalDictionary,
  secondsDenominator: number = 1000
): ((value: number, isPastDate?: boolean) => string) => {
  if (!dateIntervalDictionary) {
    dateIntervalDictionary = prepareSimpleIntervalDictionary(
      () => '',
      () => '',
    )
  }

  return (value: number, isPastDate: boolean = false) => {
    return dateIntervalDictionary(
      dateIntervalPieces(value / secondsDenominator),
      isPastDate
    )
  }
}