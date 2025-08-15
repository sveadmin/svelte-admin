import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
  RequiredValidatorData,
} from '../types.js'
import { VALUE_REQUIRED } from '../errors.js'

export function requiredValidator (data: RequiredValidatorData = {}): (params: AnyValidator |  any) => IsValid {
  return function (parameters?: AnyValidator | any) : IsValid {
    const {
      errorMessage = VALUE_REQUIRED,
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

    if (value !== undefined
      && value !== null
      && value !== '') {
      return {
        valid: true,
        validatedValue: value,
      }
    }
    return {
      message: i18n.t(errorMessage) ?? errorMessage,
      error: VALUE_REQUIRED,
      valid: false
    }
  }
}