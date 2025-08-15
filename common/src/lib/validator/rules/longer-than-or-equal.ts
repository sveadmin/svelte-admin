import { VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function longerThanOrEqualValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a >= b,
    errorMessage: data.errorMessage ?? VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL,
    get valueFallback () { return data.valueFallback },
  })
}