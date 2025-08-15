import { i18n } from '../../i18n/index.js'

import {
  DAY_DOES_NOT_MATCH_CRITERIA,
  EMPTY_DATE,
  INVALID_DATE,
  MONTH_DOES_NOT_MATCH_CRITERIA,
  YEAR_DOES_NOT_MATCH_CRITERIA,
} from '../errors.js'

import type {
  DatePartValidator,
  DateValidator,
  DateValidatorData,
  IsValid,
  StringValidator,
} from '../types.js'

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
  return function (parameters?: DateValidator | StringValidator | Date | string) : IsValid {
    let {
      datePartValidator,
      errorMessage = INVALID_DATE,
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
    }

    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    if (!value) {
      return {
        valid: false,
        error: EMPTY_DATE,
        message: i18n.t(EMPTY_DATE) ?? EMPTY_DATE
      }
    }
    value = (value instanceof Date)
      ? value
      : new Date(value)
    if (isNaN(value.getTime())) {
      return {
        valid: false,
        error: INVALID_DATE,
        message: i18n.t(errorMessage) ?? errorMessage
      }
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
        return {
          valid: false,
          error: YEAR_DOES_NOT_MATCH_CRITERIA,
          message: i18n.t(YEAR_DOES_NOT_MATCH_CRITERIA) ?? YEAR_DOES_NOT_MATCH_CRITERIA
        }
      }    
      if (!compareDatePart(datePartValidator?.month, value.getMonth() + 1)) {
        return {
          valid: false,
          error: MONTH_DOES_NOT_MATCH_CRITERIA,
          message: i18n.t(MONTH_DOES_NOT_MATCH_CRITERIA) ?? MONTH_DOES_NOT_MATCH_CRITERIA
        }
      }
      if (!compareDatePart(datePartValidator?.day, value.getDate())) {
        return {
          valid: false,
          error: DAY_DOES_NOT_MATCH_CRITERIA,
          message: i18n.t(DAY_DOES_NOT_MATCH_CRITERIA) ?? DAY_DOES_NOT_MATCH_CRITERIA
        }
      }
    }

    return {
      valid: true,
      validatedValue: value,
    }
  }
}