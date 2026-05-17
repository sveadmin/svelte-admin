import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED
} from '$lib/config.js'

import {
  DAY_DOES_NOT_MATCH_CRITERIA,
  EMPTY_DATE,
  INVALID_DATE,
  MONTH_DOES_NOT_MATCH_CRITERIA,
  YEAR_DOES_NOT_MATCH_CRITERIA,
} from '../errors.js'

import {
  identityKey,
} from '../types.js'

import type {
  DateValidator,
  DateValidatorData,
  IsValid,
  StringValidator,
} from '../types.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `valid-date`
}

function compareDatePart(expected?: string | number | (() => string | number), current?: number) : boolean {
  if (!expected) {
    return true
  }
  
  if (typeof expected === 'function') {
    expected = expected()
  }
  if (typeof expected === 'string') {
    expected = parseInt(expected)
  }
  return expected == current
}

export function validDateValidator (data: DateValidatorData = {}): (parameters?: DateValidator | StringValidator | Date | string) => IsValid {
  function validatorFunction(parameters?: DateValidator | StringValidator | Date | string) : IsValid {
    let {
      datePartValidator,
      errorCode = INVALID_DATE,
      errorMessage,
      isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
      orValidators,
    } = data
    let value: Date | string | undefined

    if (!parameters
      || parameters instanceof Date
      || typeof parameters === 'string'
      || typeof parameters === 'number') {
      value = parameters
    } else {
      value = parameters.value
      if (!value
        && parameters.data?.valueFallback) {
        value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
      }
      orValidators = parameters?.data?.orValidators ?? orValidators
    }

    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }


    if (!value) {
      return orValidator({
        orValidators,
        previousResult: {
          valid: false,
          error: EMPTY_DATE,
          message: errorMessage ?? i18n.t(EMPTY_DATE) ?? EMPTY_DATE
        },
        value
      })
    }
    value = (value instanceof Date)
      ? value
      : new Date(value)


    if (isNaN(value.getTime())) {
      return orValidator({
        orValidators,
          previousResult: {
          valid: false,
          error: errorCode,
          message: errorMessage ?? i18n.t(errorCode) ?? errorCode
        },
        value
      })
    }

    if (datePartValidator) {
      datePartValidator = (typeof datePartValidator === 'function')
        ? datePartValidator()
        : datePartValidator
    }
      
    if (!(parameters instanceof Date)
      && typeof parameters !== 'string') {
      datePartValidator = (typeof parameters?.data?.datePartValidator === 'function')
        ? parameters?.data?.datePartValidator() ?? datePartValidator
        : parameters?.data?.datePartValidator ?? datePartValidator
    }

    if (datePartValidator) {
      if (!compareDatePart(datePartValidator?.year, value.getFullYear())) {
        return orValidator({
          orValidators,
          previousResult: {
            valid: false,
            error: YEAR_DOES_NOT_MATCH_CRITERIA,
            message: i18n.t(YEAR_DOES_NOT_MATCH_CRITERIA) ?? YEAR_DOES_NOT_MATCH_CRITERIA
          },
          value
        })
      }    
      if (!compareDatePart(datePartValidator?.month, value.getMonth() + 1)) {
        return orValidator({
          orValidators,
          previousResult: {
            valid: false,
            error: MONTH_DOES_NOT_MATCH_CRITERIA,
            message: i18n.t(MONTH_DOES_NOT_MATCH_CRITERIA) ?? MONTH_DOES_NOT_MATCH_CRITERIA
          },
          value
        })
      }
      if (!compareDatePart(datePartValidator?.day, value.getDate())) {
        return orValidator({
          orValidators,
          previousResult: {
            valid: false,
            error: DAY_DOES_NOT_MATCH_CRITERIA,
            message: i18n.t(DAY_DOES_NOT_MATCH_CRITERIA) ?? DAY_DOES_NOT_MATCH_CRITERIA
          },
          value
        })
      }
    }
    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value.toISOString()}
      : undefined

    return {
      valid: true,
      validatedValue,
    }
  }

  validatorFunction[identityKey] = getIdentity()
  return validatorFunction

}