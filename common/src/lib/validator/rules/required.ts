import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
  GenericValidatorData,
} from '../types.js'
import { VALUE_REQUIRED } from '../errors.js'

import { orValidator } from './or-validator.js'

function getIdentity(): string {
  return `required`
}

export function requiredValidator (data: GenericValidatorData = {}): (params: AnyValidator |  any) => IsValid {
  return function (parameters?: AnyValidator | any) : IsValid {
    let {
      errorCode = VALUE_REQUIRED,
      errorMessage,
      isValidatedValueAdded = true,
      orValidators,
    } = data

    let value = (parameters && parameters.hasOwnProperty('value'))
      ? parameters.value
      : parameters
    if (!value
      && parameters?.data?.valueFallback) {
      value = (typeof parameters?.data?.valueFallback === 'function') ? parameters.data.valueFallback() : parameters.data.valueFallback  
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data.valueFallback() : data.valueFallback  
    }

    orValidators = parameters?.data?.orValidators ?? orValidators

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity()]: value}
      : undefined

    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode) ?? errorCode,
      error: errorCode,
      valid: false
    }

    if (value !== undefined
      && value !== null
      && value !== '') {
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