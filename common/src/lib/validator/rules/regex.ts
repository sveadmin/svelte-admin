import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
  RegexValidatorData,
} from '../types.js'

import { VALUE_DOES_NOT_MATCH_PATTERN } from '../errors.js'

import { orValidator } from './or-validator.js'

function getIdentity(pattern: string): string {
  return `regex[${pattern}]`
}

export function regexValidator (data: RegexValidatorData): (params: AnyValidator |  any) => IsValid {
  let {
    errorCode = VALUE_DOES_NOT_MATCH_PATTERN,
    errorMessage,
    isValidatedValueAdded = true,
    orValidators,
    pattern,
  } = data
  
  return function (parameters?: AnyValidator | any) : IsValid {
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

    if (pattern) {
      pattern = (typeof pattern === 'string')
        ? new RegExp(pattern)
        : pattern
    }
      
    if (parameters?.data?.pattern) {
      pattern = (typeof parameters?.data?.pattern === 'string')
        ? new RegExp(parameters?.data?.pattern)
        : parameters?.data?.pattern
    }

    orValidators = parameters?.data?.orValidators ?? orValidators
    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity(pattern.toString())]: value}
      : undefined

    let failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {pattern: pattern.toString()}) ?? errorCode,
      error: VALUE_DOES_NOT_MATCH_PATTERN,
      valid: false
    }

    if (value === undefined
      || value === null) {
      return orValidator({
        orValidators,
        previousResult: failMessage,
        value
      })
    }



    if (value.toString().match(pattern)) {
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