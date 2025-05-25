import { i18n } from '../../i18n/index.js'

import type {
  ComparatorData,
  IsValid,
  NumberValidator,
  StringValidator,
} from '../types.js'

import {
  DATE_LENGTH_CAN_NOT_BE_COMPARED,
} from '../errors.js'

export function lengthComparator (data: ComparatorData ) {
  const {
    comparator,
    errorMessage,
  } = data
  return function (parameters?: NumberValidator | StringValidator | number | string) : IsValid {
    let value = (!parameters
      || typeof parameters === 'string'
      || typeof parameters === 'number')
      ? parameters
      : parameters.value

    let currentBase: number | Date | undefined = (typeof data.base === 'function') ? data.base() : data.base

    if (currentBase instanceof Date) {
        return {
          message: i18n.t(DATE_LENGTH_CAN_NOT_BE_COMPARED, {limit: currentBase.toISOString()}) ?? DATE_LENGTH_CAN_NOT_BE_COMPARED,
          error: DATE_LENGTH_CAN_NOT_BE_COMPARED,
          valid: false
        }
    }
    if (typeof parameters !== 'string'
      && typeof parameters !== 'number') {
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

    value = value.toString().length
    currentBase = parseFloat(currentBase + '')

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