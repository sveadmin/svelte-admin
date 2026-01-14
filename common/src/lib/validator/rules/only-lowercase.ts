import {
  VALUE_MUST_HAVE_ONLY_LOWERCASE,
} from '../errors.js'

import type {
  CaseComparisonValidatorData,
} from '../types.js'

import {
  caseComparator,
} from './case-comparator.js'

export function onlyLowercaseValidator (data?: CaseComparisonValidatorData ) {
  return caseComparator({
    ...data,
    comparator: (a?: string) : boolean => (!!a && typeof a.toLowerCase === 'function' && a === a.toLowerCase()) ?? false,
    errorCode: VALUE_MUST_HAVE_ONLY_LOWERCASE,
    errorMessage: data?.errorMessage,
    getIdentity: () : string => {
      return `only-lowercase`
    },
    get valueFallback () { return data?.valueFallback },
  })
}