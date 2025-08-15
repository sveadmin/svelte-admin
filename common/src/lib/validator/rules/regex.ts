import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
  RegexValidatorData,
} from '../types.js'

import { VALUE_DOES_NOT_MATCH_PATTERN } from '../errors.js'

export function regexValidator (data: RegexValidatorData): (params: AnyValidator |  any) => IsValid {
  let {
    errorMessage = VALUE_DOES_NOT_MATCH_PATTERN,
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

    if (value === undefined
      || value === null) {
      return {
        message: i18n.t(errorMessage, {pattern: pattern.toString()}) ?? errorMessage,
        error: VALUE_DOES_NOT_MATCH_PATTERN,
        valid: false
      }
    }

    if (value.toString().match(pattern)) {
      return {
        valid: true,
        validatedValue: value,
      }
    }
    return {
      message: i18n.t(errorMessage, {pattern: pattern.toString()}) ?? errorMessage,
      error: VALUE_DOES_NOT_MATCH_PATTERN,
      valid: false
    }
  }
}