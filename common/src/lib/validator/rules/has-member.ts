import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED,
} from '$lib/config.js'

import {
  LIST_IS_EMPTY
} from '../errors.js'

import type {
  AnyValidator,
  GenericValidatorData,
  IsValid,
} from '../types.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `has-member`
}

export function hasMemberValidator (data: GenericValidatorData = {}) {
  let {
    errorCode = LIST_IS_EMPTY,
    errorMessage,
    isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
    orValidators,
  } = data

  return function (parameters?: AnyValidator | any) : IsValid {
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

    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode) ?? errorCode,
      error: LIST_IS_EMPTY,
      valid: false
    }

    if (!value) {
      return orValidator({
        orValidators,
        previousResult: failMessage,
        value
      })
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value}
      : undefined


    if (Array.isArray(value)
      && value.length > 0) {
      return {
        valid: true,
        validatedValue,
      }
    }

    const elements = Object.keys(value)
    if (elements.length > 0) {
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