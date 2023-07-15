import { i18n } from '../../i18n/index.js'

import {
  EMPTY_DATE,
  INVALID_DATE,
} from '../errors.js'

import {
  DateValidator,
  IsValid,
} from '../types.js'

export function validDateValidator (): (parameters: DateValidator) => IsValid {
  return function (parameters: DateValidator) : IsValid {
    let { value } = parameters
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
        message: i18n.t(INVALID_DATE) ?? INVALID_DATE
      }
    }
    return {
      valid: true,
    }
  }
}