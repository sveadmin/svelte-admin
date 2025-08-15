import { i18n } from '../../i18n/index.js'

import type {
  HasLowercaseData,
  IsValid,
  StringValidator,
} from '../types.js'

import {
  VALUE_DOES_NOT_HAVE_LOWERCASE,
} from '../errors.js'

export function hasLowercaseValidator (data: HasLowercaseData = {}) {
  const {
    errorMessage = VALUE_DOES_NOT_HAVE_LOWERCASE,
  } = data
  return function (parameters?: StringValidator | string) : IsValid {
    let value = (parameters
      && typeof parameters !== 'string')
      ? parameters.value
      : parameters

    if (!value
      && typeof parameters !== 'string'
      && parameters?.data?.valueFallback) {
      value = (typeof parameters.data?.valueFallback === 'function') ? parameters.data?.valueFallback() : parameters.data?.valueFallback
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data?.valueFallback() : data?.valueFallback
    }

    const failMessage = {
      message: (i18n.t(errorMessage) ?? errorMessage),
      error: VALUE_DOES_NOT_HAVE_LOWERCASE,
      valid: false
    }

    if (!value
      || typeof value.toUpperCase !== 'function') {
      return failMessage
    }

    return (value !== value.toUpperCase())
      ? {
        valid: true,
        validatedValue: value,
      }
      : failMessage
  }
}