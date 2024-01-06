import { i18n } from '../../i18n/index.js'
import {
  AnyValidator,
  IsValid,
} from '../types.js'

import { VALUE_MATCHES_BLACKLISTED_COLUMN } from '../errors.js'

export function notEqualToFieldValidator (
  fieldName: string,
  ignoreEmpty: boolean = false,
) : (params: AnyValidator) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const { data, value } = params
    if (!data
      || value != data[fieldName]
      || (ignoreEmpty
        && !data[fieldName])) {
      return {
        valid: true
      }
    }
    return {
      message: (i18n.t(VALUE_MATCHES_BLACKLISTED_COLUMN) ?? VALUE_MATCHES_BLACKLISTED_COLUMN) + ' `' + fieldName + '` : ' + data[fieldName],
      error: VALUE_MATCHES_BLACKLISTED_COLUMN,
      valid: false
    }
  }
}