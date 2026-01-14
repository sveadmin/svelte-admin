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

import { orValidator } from './or-validator.js'

export function comparator (data: ComparatorData ) {
  let {
    comparator,
    errorCode = COMPARISON_FAILED,
    errorMessage,
    getIdentity = (base?: string) => 'comparator',
    isValidatedValueAdded = true,
    orValidators,
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

      orValidators = parameters?.data?.orValidators ?? orValidators
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


    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {limit: currentBase.toString()}) ?? errorCode,
      error: errorCode,
      valid: false
    }

    if (currentBase instanceof Date) {
        if (!(value instanceof Date)) {
          value = new Date(value)
        }
        if (value instanceof Date
          && comparator(value.getTime(), currentBase.getTime())
        ) {
          const validatedValue = (isValidatedValueAdded)
            ? {[getIdentity(currentBase?.toISOString())]: value.toISOString()}
            : undefined
          return {
            valid: true,
            validatedValue,
          }
        }
        failMessage.message = errorMessage ?? i18n.t(errorCode, {limit: currentBase.toISOString()}) ?? errorCode
        return orValidator({
          orValidators,
          previousResult: failMessage,
          value
        })
    }

    value = parseFloat(value?.toString().replace(',', '.'))
    currentBase = parseFloat(currentBase?.toString().replace(',', '.'))
    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity(currentBase?.toString())]: value}
      : undefined

    if ((!isNaN(value)
      && !isNaN(currentBase)
      && comparator(value, currentBase))) {
      return {
        valid: true,
        validatedValue,
      }
    }

    return orValidator({
      orValidators,
      previousResult: failMessage,
      value
    })
  }
}