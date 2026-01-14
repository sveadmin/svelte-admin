import {
  VALUE_DOES_NOT_HAVE_UPPERCASE,
} from '../errors.js'

import type {
  CaseComparisonValidatorData,
} from '../types.js'

import {
  caseComparator,
} from './case-comparator.js'

export function hasUppercaseValidator (data?: CaseComparisonValidatorData ) {
  return caseComparator({
    ...data,
    comparator: (a?: string) : boolean => (!!a && typeof a.toLowerCase === 'function' && a !== a.toLowerCase()) ?? false,
    errorCode: VALUE_DOES_NOT_HAVE_UPPERCASE,
    errorMessage: data?.errorMessage,
    getIdentity: () : string => {
      return `has-uppercase`
    },
    get valueFallback () { return data?.valueFallback },
  })
}