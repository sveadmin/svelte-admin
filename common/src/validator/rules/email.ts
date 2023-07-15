import { i18n } from '../../i18n/index.js'
import { INVALID_EMAIL } from '../errors.js'
import {
  IsValid,
  StringValidator,
} from '../types.js'

export function emailValidator () {
  return function (params: StringValidator) : IsValid {
    const { value } = params
    if (value
      && !!value.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      return {
        valid: true,
      }
    }
    return {
      message: i18n.t(INVALID_EMAIL) ?? INVALID_EMAIL,
      error: INVALID_EMAIL,
      valid: false
    }
  }
}