import { i18n } from '../../i18n/index.js'
import type {
  LookupTable,
  LookupTableFunction,
} from '../../types.js'
import { VALUE_BLOCKED } from '../errors.js'
import type {
  AnyValidator,
  IsValid,
} from '../types.js'

export function blockedListValidator (lookupTable: LookupTable | LookupTableFunction = {}): (params: AnyValidator) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const lookupValues = (typeof lookupTable === 'function') ? lookupTable() : lookupTable
    const { value } = params
    if ((value === undefined
      || value === null
      || value === '')) {
      // To handle cases where empty value is not allowed, add a required validator prior to this check
      return {
        valid: true
      }
    }
    if ((Object.keys(lookupValues).indexOf(value.toString()) === -1)) {
      return {
        valid: true
      }
    }
    return {
      message: i18n.t(VALUE_BLOCKED, {list: ' [' + Object.keys(lookupValues).join(', ') + ']'}) ?? VALUE_BLOCKED,
      error: VALUE_BLOCKED,
      valid: false
    }
  }
}