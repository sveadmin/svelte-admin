import { VALUE_HAS_TO_MATCH_LENGTH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function equalLengthValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    ...data,
    get base () { return data.base },
    comparator: (a: number, b: number) => a === b,
    errorCode: VALUE_HAS_TO_MATCH_LENGTH,
    errorMessage: data.errorMessage,
    getIdentity: (base?: string) : string => {
      return `equal-length[${base}]`
    },
    get valueFallback () { return data.valueFallback },
  })
}