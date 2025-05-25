import { VALUE_IS_NOT_LONG_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function longerThanValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a > b,
    errorMessage: VALUE_IS_NOT_LONG_ENOUGH,
    get valueFallback () { return data.valueFallback },
  })
}