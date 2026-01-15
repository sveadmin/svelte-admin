import { i18n } from '../../i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED,
} from '$lib/config.js'

import { INVALID_EMAIL } from '../errors.js'
import type {
  GenericValidatorData,
  IsValid,
  StringValidator,
} from '../types.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `email`
}

export function emailValidator (data: GenericValidatorData = {}): (parameters?: StringValidator | string) => IsValid {
  let {
    errorCode = INVALID_EMAIL,
    errorMessage,
    isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
    orValidators,
  } = data
  
  return function (parameters?: StringValidator | string) : IsValid {
    let value = (parameters
      && typeof parameters !== 'string')
      ? parameters.value
      : parameters

    if (!value
      && typeof parameters !== 'string'
      && parameters?.data?.valueFallback) {
      value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    if (typeof parameters !== 'string') {
      orValidators = parameters?.data?.orValidators ?? orValidators
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value}
      : undefined

    const failMessage = {
      message: errorMessage ?? i18n.t(errorCode) ?? errorCode,
      error: errorCode,
      valid: false
    }

    if (value
      && !!value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
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