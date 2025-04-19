import { i18n } from '../../i18n/index.js'

import {
  LIST_IS_EMPTY
} from '../errors.js'

import type {
  AnyValidator,
  IsValid,
  ValueFallback,
} from '../types.js'

export function hasMemberValidator (data: ValueFallback = {}) {
  return function (parameters?: AnyValidator | any) : IsValid {
    let value = (parameters && parameters.hasOwnProperty('value'))
      ? parameters.value
      : parameters

    if (!value
      && parameters?.data?.valueFallback) {
      value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    if (!value) {
      return {
        message: i18n.t(LIST_IS_EMPTY) ?? LIST_IS_EMPTY,
        error: LIST_IS_EMPTY,
        valid: false
      }
    }

    if (Array.isArray(value)
      && value.length > 0) {
      return {
        valid: true,
        validatedValue: value,
      }
    }

    const elements = Object.keys(value)
    return elements.length > 0 
      ? {
        valid: true,
        validatedValue: value,
      }
      : {
        message: i18n.t(LIST_IS_EMPTY) ?? LIST_IS_EMPTY,
        error: LIST_IS_EMPTY,
        valid: false
      }
  }
}