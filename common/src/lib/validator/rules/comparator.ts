import { i18n } from '../../i18n/index.js'

import type {
  ComparatorData,
  DateValidator,
  IsValid,
  NumberValidator,
  StringValidator,
} from '../types.js'

import {
  COMPARISON_FAILED,
} from '../errors.js'

export function comparator (data: ComparatorData ) {
  const {
    comparator,
    errorMessage = COMPARISON_FAILED,
  } = data
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
          && comparator(value.getTime(), currentBase.getTime())
        ) {
          return {
            valid: true,
            validatedValue: value,
          }
        }
        return {
          message: i18n.t(errorMessage, {limit: currentBase.toISOString()}) ?? errorMessage,
          error: errorMessage,
          valid: false
        }
    }

    value = parseFloat(value?.toString().replace(',', '.'))
    currentBase = parseFloat(currentBase?.toString().replace(',', '.'))

    return ((!isNaN(value)
      && !isNaN(currentBase)
      && comparator(value, currentBase)))
      ? {
        valid: true,
        validatedValue: value,
      }
      : {
        message: i18n.t(errorMessage, {limit: currentBase.toString()}) ?? errorMessage,
        error: errorMessage,
        valid: false
      }
  }
}