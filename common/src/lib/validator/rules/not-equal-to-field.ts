import { i18n } from '$lib/i18n/index.js'

import {
  IS_VALIDATED_VALUE_ADDED
} from '$lib/config.js'

import type {
  AnyValidator,
  FieldValidatorData,
  IsValid,
} from '../types.js'

import { VALUE_MATCHES_BLACKLISTED_COLUMN } from '../errors.js'

import { orValidator } from './or-validator.js'

function getIdentity(field?: string): string {
  return `not-equal-to-field[${field}]`
}

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
    let {
      dataSet,
      errorCode = VALUE_MATCHES_BLACKLISTED_COLUMN,
      errorMessage,
      fieldName,
      ignoreEmpty,
      isValidatedValueAdded = IS_VALIDATED_VALUE_ADDED,
      orValidators,
      strictComparison,
    } = data

    let value: any
    
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

    orValidators = parameters?.data?.orValidators ?? orValidators

    const failMessage = {
      message: errorMessage ?? i18n.t(errorCode, {fieldName}) ?? errorCode,
      error: errorCode,
      valid: false
    }

    const validatedValue = (isValidatedValueAdded)
      ? {[getIdentity(fieldName)]: value}
      : undefined


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
        return orValidator({
          orValidators,
          previousResult: failMessage,
          value
        })
      }

      return {
        valid: true,
        validatedValue,
      }
    }
    return orValidator({
      orValidators,
      previousResult: failMessage,
      value
    })
  }
}