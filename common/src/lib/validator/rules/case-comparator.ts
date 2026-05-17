import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED
} from '$lib/config.js'

import {
  identityKey,
} from '../types.js'

import type {
  CaseComparatorData,
  IsValid,
  StringValidator,
} from '../types.js'

import {
  COMPARISON_FAILED,
} from '../errors.js'

import { orValidator } from './or-validator.js'

export function caseComparator (data: CaseComparatorData ) {
  let {
    comparator,
    errorCode = COMPARISON_FAILED,
    errorMessage,
    getIdentity = (base?: string) => 'case-comparator',
    isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
    orValidators,
  } = data

  function validatorFunction(parameters?: StringValidator | string) : IsValid {
    let value = (parameters
      && typeof parameters !== 'string')
      ? parameters.value
      : parameters

    if (!value
      && typeof parameters !== 'string'
      && parameters?.data?.valueFallback) {
      value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    if (typeof parameters !== 'string') {
      orValidators = parameters?.data?.orValidators ?? orValidators
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value}
      : undefined

    const failMessage = {
      message: errorMessage ?? (i18n.t(errorCode) ?? errorCode),
      error: errorCode,
      valid: false
    }

    return (comparator(value))
      ? {
        valid: true,
        validatedValue,
      }
      : orValidator({
        orValidators,
        previousResult: failMessage,
        value
      })
  }

  validatorFunction[identityKey] = getIdentity('')
  return validatorFunction

}