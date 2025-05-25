import { VALUE_HAS_TO_MATCH_LENGTH } from '../errors.js'

import type {
  ComparisonValidatorData,
} from '../types.js'

import {
  lengthComparator,
} from './length-comparator.js'

export function equalLengthValidator (data: ComparisonValidatorData ) {
  return lengthComparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a === b,
    errorMessage: VALUE_HAS_TO_MATCH_LENGTH,
    get valueFallback () { return data.valueFallback },
  })
}