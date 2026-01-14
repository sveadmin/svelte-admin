import { VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function lessThanOrEqualValidator (data: ComparisonValidatorData ) {
  return comparator({
    ...data,
    get base () { return data.base },
    comparator: (a: number, b: number) => a <= b,
    errorCode: VALUE_IS_NOT_SMALL_ENOUGH_ALLOWING_EQUAL,
    errorMessage: data.errorMessage,
    getIdentity: (base?: string) : string => {
      return `less-than-or-equal[${base}]`
    },
    get valueFallback () { return data.valueFallback },
  })
}