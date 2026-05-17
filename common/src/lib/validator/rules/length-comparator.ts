import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED
} from '$lib/config.js'

import {
  identityKey,
} from '../types.js'

import type {
  IsValid,
  ComparatorData,
  NumberValidator,
  StringValidator,
} from '../types.js'

import {
  COMPARISON_FAILED,
  DATE_LENGTH_CAN_NOT_BE_COMPARED,
} from '../errors.js'

import { orValidator } from './or-validator.js'

export function lengthComparator (data: ComparatorData ) {
  let {
    comparator,
    errorCode = COMPARISON_FAILED,
    errorMessage,
    getIdentity = (base?: string) => 'length-comparator',
    isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
    orValidators,
  } = data
  function validatorFunction(parameters?: NumberValidator | StringValidator | number | string) : IsValid {
    let value = (!parameters
      || typeof parameters === 'string'
      || typeof parameters === 'number'
      || parameters instanceof Date)
      ? parameters
      : parameters.value

    let currentBase: number | Date | undefined = (typeof data.base === 'function') ? data.base() : data.base

    if (typeof parameters !== 'string'
      && typeof parameters !== 'number') {
      if (parameters?.data?.base) {
        currentBase = (typeof parameters.data.base === 'function') ? parameters.data.base() : parameters.data.base
      }
      if (!value
        && parameters?.data?.valueFallback) {
        value = (typeof parameters.data.valueFallback === 'function') ? parameters.data.valueFallback() : parameters.data.valueFallback
      }

      orValidators = parameters?.data?.orValidators ?? orValidators
    }

    if (currentBase instanceof Date) {
      return orValidator({
        orValidators,
        previousResult: {
          message: i18n.t(DATE_LENGTH_CAN_NOT_BE_COMPARED, {limit: currentBase?.toISOString()}) ?? DATE_LENGTH_CAN_NOT_BE_COMPARED,
          error: DATE_LENGTH_CAN_NOT_BE_COMPARED,
          valid: false
        },
        value
      })
    }

    if (!value
      && data?.valueFallback) {
      value = (typeof data.valueFallback === 'function') ? data.valueFallback() : data.valueFallback
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity(currentBase?.toString())]: ((value instanceof Date)
        ? value?.toISOString()
        : value?.toString())}
      : undefined


    if (typeof currentBase === 'undefined'
        || currentBase === null
        || typeof value === 'undefined'
        || value === null) {
      return {
        valid: true,
        validatedValue: value,
      }
    }

    const failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {limit: currentBase.toString()}) ?? errorCode,
      error: errorCode,
      valid: false
    }

    const valueToCompare: number = (value instanceof Date)
      ? value.toISOString().length
      : value.toString().length
    currentBase = parseFloat(currentBase + '')

    if ((!isNaN(valueToCompare)
      && !isNaN(currentBase)
      && comparator(valueToCompare, currentBase))) {
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

  validatorFunction[identityKey] = getIdentity()
  return validatorFunction

}