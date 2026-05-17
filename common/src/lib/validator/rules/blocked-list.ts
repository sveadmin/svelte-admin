import { i18n } from '../../i18n/index.js'
import { VALUE_BLOCKED } from '../errors.js'

import {
  identityKey,
} from '../types.js'

import type {
  AnyValidator,
  IsValid,
  ListValidatorData,
} from '../types.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `blocked-list`
}

export function blockedListValidator (data: ListValidatorData): (parameters?: AnyValidator) => IsValid {
  let {
    errorCode = VALUE_BLOCKED,
    errorMessage,
    isValidatedValueAdded = true,
    isCaseSensitive = false,
    orValidators,
  } = data
  
  function validatorFunction(parameters?: AnyValidator | any) : IsValid {
    let lookupValues = (typeof data.lookupTable === 'function') ? data.lookupTable() : data.lookupTable
    if (parameters?.data?.lookupTable) {
      lookupValues = (typeof parameters.data.lookupTable === 'function') ? parameters.data.lookupTable() : parameters.data.lookupTable
    }
    if (Array.isArray(lookupValues)) {
      lookupValues = lookupValues.reduce((aggregator, currentValue) => {
        aggregator[currentValue] = true
        return aggregator
      },
      {})
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

    const blockedKeys = (lookupValues instanceof Map)
      ? [...lookupValues.keys()]
      : Object.keys(lookupValues)

    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {list: ' [' + blockedKeys.slice(0, 7).join(', ') + ((Object.keys(lookupValues).length > 7) ? '...' : '') + ']'}) ?? errorCode,
      error: errorCode,
      valid: false
    }

    if (lookupValues instanceof Map) {
      if (lookupValues.get(key)) {
        return orValidator({
          orValidators,
          previousResult: failMessage,
          value
        })
      }
    } else if (lookupValues[key]) {
      return orValidator({
        orValidators,
        previousResult: failMessage,
        value
      })
    }

    if (isCaseSensitive) {
      return {
        valid: true,
        validatedValue,
      }
    }

    for (const lookupKey of blockedKeys) {
      if (lookupKey.toLowerCase() === key) {
        return orValidator({
          orValidators,
          previousResult: failMessage,
          value
        })
      }
    }

    return {
      valid: true,
      validatedValue,
    }
  }
  validatorFunction[identityKey] = getIdentity()
  return validatorFunction
}