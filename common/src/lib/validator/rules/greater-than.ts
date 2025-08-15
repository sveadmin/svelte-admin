import { VALUE_IS_NOT_BIG_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function greaterThanValidator (data: ComparisonValidatorData ) {
  return comparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a > b,
    errorMessage: data.errorMessage ?? VALUE_IS_NOT_BIG_ENOUGH,
    get valueFallback () { return data.valueFallback },
  })
}