import { i18n } from '../../i18n/index.js'

import {
  EMPTY_DATE,
  INVALID_DATE,
} from '../errors.js'

import type {
  DateValidator,
  IsValid,
  StringValidator,
} from '../types.js'

export function validDateValidator (): (parameters: DateValidator | StringValidator | Date | string) => IsValid {
  return function (parameters: DateValidator | StringValidator | Date | string) : IsValid {
    let value: Date | string;
    if (!parameters
      || parameters instanceof Date
      || typeof parameters === 'string'
      || typeof parameters === 'number') {
      value = parameters
    } else {
      value = parameters.value
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
        message: i18n.t(INVALID_DATE) ?? INVALID_DATE
      }
    }
    return {
      valid: true,
    }
  }
}