import { VALUE_IS_NOT_SHORT_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function shorterThanValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a < b,
    errorMessage: data.errorMessage ?? VALUE_IS_NOT_SHORT_ENOUGH,
    get valueFallback () { return data.valueFallback },
  })
}