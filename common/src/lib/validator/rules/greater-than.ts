import { i18n } from '../../i18n/index.js'

import { VALUE_IS_NOT_BIG_ENOUGH } from '../errors.js'

import type {
  ComparisonValidatorData,
  DateValidator,
  IsValid,
  NumberValidator,
  StringValidator,
} from '../types.js'

import {
  comparator
} from './comparator.js'

export function greaterThanValidator (data: ComparisonValidatorData ) {
  return comparator({
    get base () { return data.base },
    comparator: (a: number, b: number) => a > b,
    errorMessage: VALUE_IS_NOT_BIG_ENOUGH,
    get valueFallback () { return data.valueFallback },
  })
}

export function greaterThanValidator2 (data: ComparisonValidatorData ) {
  return function (parameters?: DateValidator | NumberValidator | StringValidator | Date | number | string) : IsValid {
    let value = (!parameters
      || typeof parameters === 'string'
      || typeof parameters === 'number'
      || parameters instanceof Date)
      ? parameters
      : parameters.value

    let currentBase: number | Date | undefined = (typeof data.base === 'function') ? data.base() : data.base
    if (typeof parameters !== 'string'
      && typeof parameters !== 'number'
      && !(parameters instanceof Date)) {
      if (parameters?.data?.base) {
        currentBase = (typeof parameters.data.base === 'function') ? parameters.data.base() : parameters.data.base
      }
      if (!value
        && parameters?.data?.valueFallback) {
        value = (typeof parameters.data.valueFallback === 'function') ? parameters.data.valueFallback() : parameters.data.valueFallback
      }
    }

    if (!value
      && data?.valueFallback) {
      value = (typeof data.valueFallback === 'function') ? data.valueFallback() : data.valueFallback
    }

    if (typeof currentBase === 'undefined'
        || currentBase === null
        || typeof value === 'undefined'
        || value === null) {
      return {
        valid: true,
        validatedValue: value,
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
            validatedValue: value,
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
        validatedValue: value,
      }
      : {
        message: i18n.t(VALUE_IS_NOT_BIG_ENOUGH, {limit: currentBase.toString()}) ?? VALUE_IS_NOT_BIG_ENOUGH,
        error: VALUE_IS_NOT_BIG_ENOUGH,
        valid: false
      }
  }
}