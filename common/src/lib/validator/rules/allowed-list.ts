import { i18n } from '../../i18n/index.js'
import { VALUE_NOT_ALLOWED } from '../errors.js'
import type {
  AnyValidator,
  IsValid,
  ListValidatorData,
} from '../types.js'

export function allowedListValidator (data: ListValidatorData): (parameters?: AnyValidator | any) => IsValid {
  const {
    errorMessage = VALUE_NOT_ALLOWED,
    isCaseSensitive = false
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

    const key = (isCaseSensitive)
      ? value.toString()
      : value.toString().toLowerCase()

    if (lookupValues instanceof Map) {
      if (lookupValues.get(key)) {
        return {
          valid: true,
          validatedValue: value,
        }
      }
    } else if (lookupValues[key]) {
      return {
        valid: true,
        validatedValue: value,
      }
    }

    const allowedKeys = (lookupValues instanceof Map)
      ? [...lookupValues.keys()]
      : Object.keys(lookupValues)
      
    if (isCaseSensitive) {
      return {
        message: i18n.t(errorMessage, {list: ' [' + allowedKeys.slice(0, 7).join(', ') + ((Object.keys(lookupValues).length > 7) ? '...' : '') + ']'}) ?? errorMessage,
        error: VALUE_NOT_ALLOWED,
        valid: false
      }
    }
    for (const lookupKey of allowedKeys) {
      if (lookupKey.toLowerCase() === key) {
        return {
          valid: true,
          validatedValue: value,
        }
      }
    }

    return {
      message: i18n.t(errorMessage, {list: ' [' + allowedKeys.slice(0, 7).join(', ') + ((Object.keys(lookupValues).length > 7) ? '...' : '') + ']'}) ?? errorMessage,
      error: VALUE_NOT_ALLOWED,
      valid: false
    }
  }
}