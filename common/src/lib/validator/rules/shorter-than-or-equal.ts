import { VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function shorterThanOrEqualValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a <= b,
    errorMessage: VALUE_IS_NOT_SHORT_ENOUGH_ALLOWING_EQUAL,
    get valueFallback () { return data.valueFallback },
  })
}