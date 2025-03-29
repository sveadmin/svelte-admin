import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
} from '../types.js'
import { VALUE_REQUIRED } from '../errors.js'

export function requiredValidator (): (params: AnyValidator |  any) => IsValid {
  return function (params: AnyValidator | any) : IsValid {
    const value = (params && params.hasOwnProperty('value'))
      ? params.value
      : params
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