import { i18n } from '../../i18n/index.js'
import type {
  AnyValidator,
  FieldValidatorData,
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

export function notEqualToFieldValidator (data: FieldValidatorData) : (parameters?: AnyValidator | any) => IsValid {
  return function (parameters?: AnyValidator | any) : IsValid {
    let value: any,
      dataSet: {[key: string] :  any} | undefined = data?.dataSet,
      fieldName: string = data.fieldName,
      ignoreEmpty: boolean | undefined = data?.ignoreEmpty,
      strictComparison: boolean | undefined = data?.strictComparison
    
    if (parameters && parameters.hasOwnProperty('value')) {
      value = (typeof parameters.value === 'function') ? parameters.value() : parameters.value
      if (!value
        && parameters?.data?.valueFallback) {
        value = (typeof parameters?.data?.valueFallback === 'function') ? parameters?.data?.valueFallback() : parameters?.data?.valueFallback
      }
      dataSet = parameters?.data?.dataSet ?? dataSet
      ignoreEmpty = parameters?.data?.ignoreEmpty ?? ignoreEmpty
      strictComparison = parameters?.data?.strictComparison ?? strictComparison
    } else {
      value = (typeof parameters === 'function') ? parameters() : parameters
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    const failMessage = {
      message: (i18n.t(VALUE_MATCHES_BLACKLISTED_COLUMN, {fieldName}) ?? VALUE_MATCHES_BLACKLISTED_COLUMN),
      error: VALUE_MATCHES_BLACKLISTED_COLUMN,
      valid: false
    }

    if (!dataSet
      || (!strictComparison
        && value !== dataSet[fieldName])
      || value != dataSet[fieldName]
      || (ignoreEmpty
        && !dataSet[fieldName])) {
      if (dataSet
        && dataSet[fieldName]
        && typeof dataSet[fieldName] === 'object'
        && strictComparison
        && JSON.stringify(sort(dataSet[fieldName])) === JSON.stringify(sort(value))) {
        return failMessage
      }

      return {
        valid: true,
        validatedValue: value,
      }
    }
    return failMessage
  }
}