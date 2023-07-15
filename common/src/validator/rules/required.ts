import { i18n } from '../../i18n/index.js'
import {
  AnyValidator,
  IsValid,
} from '../types.js'
import { VALUE_REQUIRED } from '../errors.js'

export function requiredValidator (): (params: AnyValidator) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const { value } = params
    if (value !== undefined
      && value !== null
      && value !== '') {
      return {
        valid: true,
      }
    }
    return {
      message: i18n.t(VALUE_REQUIRED) ?? VALUE_REQUIRED,
      error: VALUE_REQUIRED,
      valid: false
    }
  }
}