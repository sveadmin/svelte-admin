import { VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function greaterThanOrEqualValidator (data: ComparisonValidatorData ) {
  return comparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a >= b,
    errorMessage: data.errorMessage ?? VALUE_IS_NOT_BIG_ENOUGH_ALLOWING_EQUAL,
    get valueFallback () { return data.valueFallback },
  })
}