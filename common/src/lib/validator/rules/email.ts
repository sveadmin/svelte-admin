import { i18n } from '../../i18n/index.js'
import { INVALID_EMAIL } from '../errors.js'
import type {
  EmailValidatorData,
  IsValid,
  StringValidator,
} from '../types.js'

export function emailValidator (data: EmailValidatorData = {}): (parameters?: StringValidator | string) => IsValid {
  const {
    errorMessage = INVALID_EMAIL,
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

    if (value
      && !!value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      return {
        valid: true,
        validatedValue: value,
      }
    }
    return {
      message: i18n.t(errorMessage) ?? errorMessage,
      error: INVALID_EMAIL,
      valid: false
    }
  }
}