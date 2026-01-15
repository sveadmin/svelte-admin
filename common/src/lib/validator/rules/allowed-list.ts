import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED
} from '$lib/config.js'

import { VALUE_NOT_ALLOWED } from '../errors.js'
import type {
  AnyValidator,
  IsValid,
  ListValidatorData,
} from '../types.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `allowed-list`
}

export function allowedListValidator (data: ListValidatorData): (parameters?: AnyValidator | any) => IsValid {
  let {
    errorCode = VALUE_NOT_ALLOWED,
    errorMessage,
    isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
    isCaseSensitive = false,
    orValidators,
  } = data
  
  return function (parameters?: AnyValidator | any) : IsValid {
    let lookupValues = (typeof data.lookupTable === 'function') ? data.lookupTable() : data.lookupTable
    if (parameters?.data?.lookupTable) {
      lookupValues = (typeof parameters.data.lookupTable === 'function') ? parameters.data.lookupTable() : parameters.data.lookupTable
    }
    let value
    
    if (parameters && parameters.hasOwnProperty('value')) {
      value = parameters.value
    } else {
      if (parameters?.data?.valueFallback) {
        value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
      } else {
        value = parameters
      }
    }
    
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    orValidators = parameters?.data?.orValidators ?? orValidators

    if ((value === undefined
      || value === null
      || value === '')) {
      // To handle cases where empty value is not allowed, add a required validator prior to this check
      return {
        valid: true,
        validatedValue: {[getIdentity()]: value},
      }
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value}
      : undefined

    const key = (isCaseSensitive)
      ? value.toString()
      : value.toString().toLowerCase()

    if (lookupValues instanceof Map) {
      if (lookupValues.get(key)) {
        return {
          valid: true,
          validatedValue,
        }
      }
    } else if (lookupValues[key]) {
      return {
        valid: true,
        validatedValue,
      }
    }

    const allowedKeys = (lookupValues instanceof Map)
      ? [...lookupValues.keys()]
      : Object.keys(lookupValues)

    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {list: ' [' + allowedKeys.slice(0, 7).join(', ') + ((Object.keys(lookupValues).length > 7) ? '...' : '') + ']'}) ?? errorCode,
      error: errorCode,
      valid: false
    }
      
    if (isCaseSensitive) {
      return orValidator({
        orValidators,
        previousResult: failMessage,
        value
      })
    }
    for (const lookupKey of allowedKeys) {
      if (lookupKey.toLowerCase() === key) {
        return {
          valid: true,
          validatedValue,
        }
      }
    }

    return orValidator({
      orValidators,
      previousResult: failMessage,
      value
    })
  }
}