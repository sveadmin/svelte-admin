import {
  VALUE_DOES_NOT_HAVE_LOWERCASE,
} from '../errors.js'

import type {
  CaseComparisonValidatorData,
} from '../types.js'

import {
  caseComparator,
} from './case-comparator.js'

export function hasLowercaseValidator (data?: CaseComparisonValidatorData ) {
  return caseComparator({
    ...data,
    comparator: (a?: string) : boolean => (!!a && typeof a.toUpperCase === 'function' && a !== a.toUpperCase()) ?? false,
    errorCode: VALUE_DOES_NOT_HAVE_LOWERCASE,
    errorMessage: data?.errorMessage,
    getIdentity: () : string => {
      return `has-lowercase`
    },
    get valueFallback () { return data?.valueFallback },
  })
}