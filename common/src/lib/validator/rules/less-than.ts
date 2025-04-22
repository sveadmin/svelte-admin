import { VALUE_IS_NOT_SMALL_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function lessThanValidator (data: ComparisonValidatorData ) {
  return comparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a < b,
    errorMessage: VALUE_IS_NOT_SMALL_ENOUGH,
    get valueFallback () { return data.valueFallback },
  })
}