import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  IsValid,
} from '../types.js'

import { VALUE_MATCHES_BLACKLISTED_COLUMN } from '../errors.js'

function sort(toBeSorted: any[] | {[key: string] : any}) : any[] | {[key: string] : any} {
  if (Array.isArray(toBeSorted)) {
    toBeSorted.sort()
  }

  const keys = Object.keys(toBeSorted)

  keys.sort()

  return keys.reduce(
    (aggregator: any[] | {[key: string] : any}, key: string | number) => {
      let currentValue
      if (Array.isArray(toBeSorted)) {
        if (typeof key !== 'number') {
          key = parseInt(key)
        }
        currentValue = toBeSorted[key]
      }

      if (!Array.isArray(toBeSorted)
        && typeof key === 'string') {
        currentValue = toBeSorted[key]
      }

      if (Array.isArray(currentValue)
        || typeof currentValue === 'object') {
        sort(currentValue)
      }

      if (Array.isArray(aggregator)) {
        if (typeof key !== 'number') {
          key = parseInt(key)
        }
        aggregator[key] = currentValue
      }

      if (!Array.isArray(aggregator)
        && typeof key === 'string') {
        aggregator[key] = currentValue
      }

      return aggregator
    },
    Array.isArray(toBeSorted) ? [] : {}
  )
}

export function notEqualToFieldValidator (
  fieldName: string,
  ignoreEmpty: boolean = false,
  strictComparison: boolean = false,
) : (params: AnyValidator) => IsValid {
  return function (params: AnyValidator) : IsValid {
    const { data, value } = params

    const failMessage = {
      message: (i18n.t(VALUE_MATCHES_BLACKLISTED_COLUMN, {fieldName}) ?? VALUE_MATCHES_BLACKLISTED_COLUMN),
      error: VALUE_MATCHES_BLACKLISTED_COLUMN,
      valid: false
    }

    if (!data
      || (!strictComparison
        && value !== data[fieldName])
      || value != data[fieldName]
      || (ignoreEmpty
        && !data[fieldName])) {
      if (data
        && data[fieldName]
        && typeof data[fieldName] === 'object'
        && strictComparison
        && JSON.stringify(sort(data[fieldName])) === JSON.stringify(sort(value))) {
        return failMessage
      }
      return {
        valid: true
      }
    }
    return failMessage
  }
}