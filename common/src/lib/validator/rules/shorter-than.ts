import { VALUE_IS_NOT_SHORT_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function shorterThanValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    ...data,
    get base () { return data.base },
    comparator: (a: number, b: number) => a < b,
    errorCode: VALUE_IS_NOT_SHORT_ENOUGH,
    errorMessage: data.errorMessage,
    getIdentity: (base?: string) : string => {
      return `shorter-than[${base}]`
    },
    get valueFallback () { return data.valueFallback },
  })
}