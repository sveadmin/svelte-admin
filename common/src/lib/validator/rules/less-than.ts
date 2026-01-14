import { VALUE_IS_NOT_SMALL_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function lessThanValidator (data: ComparisonValidatorData ) {
  return comparator({
    ...data,
    get base () { return data.base },
    comparator: (a: number, b: number) => a < b,
    errorCode: VALUE_IS_NOT_SMALL_ENOUGH,
    errorMessage: data.errorMessage,
    getIdentity: (base?: string) : string => {
      return `less-than[${base}]`
    },
    get valueFallback () { return data.valueFallback },
  })
}