import { i18n } from '../../i18n/index.js'
import {
  LookupTable,
  LookupTableFunction,
} from '../../types.js'
import { VALUE_NOT_ALLOWED } from '../errors.js'
import {
  AnyValidator,
  IsValid,
} from '../types.js'

export function allowedListValidator (lookupTable: LookupTable = {}, getLookupTable?: LookupTableFunction): (params: AnyValidator) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const lookupValues = (getLookupTable) ? getLookupTable() : lookupTable
    const { value } = params
    if ((value === undefined
      || value === null
      || value === '')) {
      // To handle cases where empty value is not allowed, add a required validator prior to this check
      return {
        valid: true
      }
    }
    if ((Object.keys(lookupValues).indexOf(value.toString()) !== -1)) {
      return {
        valid: true
      }
    }
    return {
      message: i18n.t(VALUE_NOT_ALLOWED) ?? VALUE_NOT_ALLOWED,
      error: VALUE_NOT_ALLOWED,
      valid: false
    }
  }
}