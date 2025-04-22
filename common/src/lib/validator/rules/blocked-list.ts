import { i18n } from '../../i18n/index.js'
import { VALUE_BLOCKED } from '../errors.js'
import type {
  AnyValidator,
  IsValid,
  ListValidatorData,
} from '../types.js'

export function blockedListValidator (data: ListValidatorData): (parameters?: AnyValidator) => IsValid {
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

    if ((value === undefined
      || value === null
      || value === '')) {
      // To handle cases where empty value is not allowed, add a required validator prior to this check
      return {
        valid: true,
        validatedValue: value,
      }
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    if ((Object.keys(lookupValues).indexOf(value.toString()) === -1)) {
      return {
        valid: true,
        validatedValue: value,
      }
    }
    return {
      message: i18n.t(VALUE_BLOCKED, {list: ' [' + Object.keys(lookupValues).join(', ') + ']'}) ?? VALUE_BLOCKED,
      error: VALUE_BLOCKED,
      valid: false
    }
  }
}