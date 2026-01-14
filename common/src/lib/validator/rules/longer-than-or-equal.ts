import { VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function longerThanOrEqualValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    ...data,
    get base () { return data.base },
    comparator: (a: number, b: number) => a >= b,
    errorCode: VALUE_IS_NOT_LONG_ENOUGH_ALLOWING_EQUAL,
    errorMessage: data.errorMessage,
    getIdentity: (base?: string) : string => {
      return `longer-than-or-equal[${base}]`
    },
    get valueFallback () { return data.valueFallback },
  })
}