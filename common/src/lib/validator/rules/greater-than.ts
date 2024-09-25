import { i18n } from '../../i18n/index.js'

import { VALUE_IS_NOT_BIG_ENOUGH } from '../errors.js'

import type {
  DateFunction,
  DateValidator,
  IsValid,
  NumberFunction,
  NumberValidator,
  StringValidator,
} from '../types.js'

export function greaterThanValidator (base: number | NumberFunction | Date | DateFunction ) {
  return function (params: DateValidator | NumberValidator | StringValidator) : IsValid {
    let { value } = params
    let currentBase: number | Date = (typeof base === 'function') ? base() : base
    if (typeof currentBase === 'undefined'
        || currentBase === null) {
      return {
        valid: true,
      }
    }
    if (currentBase instanceof Date) {
        if (!(value instanceof Date)) {
          value = new Date(value)
        }
        if (value instanceof Date
          && value.getTime() > currentBase.getTime()
        ) {
          return {
            valid: true,
          }
        }
        return {
          message: i18n.t(VALUE_IS_NOT_BIG_ENOUGH, {limit: currentBase.toISOString()}) ?? VALUE_IS_NOT_BIG_ENOUGH,
          error: VALUE_IS_NOT_BIG_ENOUGH,
          valid: false
        }
    }

    value = parseFloat(value + '')
    currentBase = parseFloat(currentBase + '')

    return ((!isNaN(value)
      && !isNaN(currentBase)
      && value > currentBase))
      ? {
        valid: true,
      }
      : {
        message: i18n.t(VALUE_IS_NOT_BIG_ENOUGH, {limit: currentBase.toString()}) ?? VALUE_IS_NOT_BIG_ENOUGH,
        error: VALUE_IS_NOT_BIG_ENOUGH,
        valid: false
      }
  }
}