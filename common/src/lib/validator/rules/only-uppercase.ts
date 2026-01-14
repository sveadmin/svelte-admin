import {
  VALUE_MUST_HAVE_ONLY_UPPERCASE,
} from '../errors.js'

import type {
  CaseComparisonValidatorData,
} from '../types.js'

import {
  caseComparator,
} from './case-comparator.js'

export function onlyUppercaseValidator (data?: CaseComparisonValidatorData ) {
  return caseComparator({
    ...data,
    comparator: (a?: string) : boolean => (!!a && typeof a.toUpperCase === 'function' && a === a.toUpperCase()) ?? false,
    errorCode: VALUE_MUST_HAVE_ONLY_UPPERCASE,
    errorMessage: data?.errorMessage,
    getIdentity: () : string => {
      return `only-uppercase`
    },
    get valueFallback () { return data?.valueFallback },
  })
}