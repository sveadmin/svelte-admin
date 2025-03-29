import { i18n } from '../../i18n/index.js'

import { VALUE_IS_NOT_SMALL_ENOUGH } from '../errors.js'

import type {
  DateFunction,
  DateValidator,
  IsValid,
  NumberFunction,
  NumberValidator,
  StringValidator,
} from '../types.js'

export function lessThanValidator (base: number | NumberFunction | Date | DateFunction ) {
  return function (params: DateValidator | NumberValidator | StringValidator | Date | number | string) : IsValid {
    let value = (!params
      || typeof params === 'string'
      || typeof params === 'number'
      || params instanceof Date)
      ? params
      : params.value
    let currentBase = (typeof base === 'function') ? base() : base
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
          && value.getTime() < currentBase.getTime()
        ) {
          return {
            valid: true,
          }
        }
        return {
          message: i18n.t(VALUE_IS_NOT_SMALL_ENOUGH, {limit: currentBase.toISOString()}) ?? VALUE_IS_NOT_SMALL_ENOUGH,
          error: VALUE_IS_NOT_SMALL_ENOUGH,
          valid: false
        }
    }

    value = parseFloat(value + '')
    currentBase = parseFloat(currentBase + '')

    return ((!isNaN(value)
      && !isNaN(currentBase)
      && value < currentBase))
      ? {
        valid: true,
      }
      : {
        message: i18n.t(VALUE_IS_NOT_SMALL_ENOUGH, {limit: currentBase.toString()}) ?? VALUE_IS_NOT_SMALL_ENOUGH,
        error: VALUE_IS_NOT_SMALL_ENOUGH,
        valid: false
      }
  }
}