import { i18n } from '../../i18n/index.js'

import type {
  HasUppercaseData,
  IsValid,
  StringValidator,
} from '../types.js'

import {
  VALUE_DOES_NOT_HAVE_UPPERCASE,
} from '../errors.js'

export function hasUppercaseValidator (data: HasUppercaseData = {}) {
  const {
    errorMessage = VALUE_DOES_NOT_HAVE_UPPERCASE,
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
      error: VALUE_DOES_NOT_HAVE_UPPERCASE,
      valid: false
    }

    if (!value
      || typeof value.toLowerCase !== 'function') {
      return failMessage
    }

    return (value !== value.toLowerCase())
      ? {
        valid: true,
        validatedValue: value,
      }
      : failMessage
  }
}