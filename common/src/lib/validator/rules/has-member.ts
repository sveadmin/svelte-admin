import { i18n } from '../../i18n/index.js'

import {
  LIST_IS_EMPTY
} from '../errors.js'

import type {
  AnyValidator,
  IsValid,
} from '../types.js'

export function hasMemberValidator () {
  return function (params: AnyValidator | any) : IsValid {
    let value = (params && params.hasOwnProperty('value'))
      ? params.value
      : params

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
        valid: true
      }
    }

    const elements = Object.keys(value)
    return elements.length > 0 
      ? {
        valid: true
      }
      : {
        message: i18n.t(LIST_IS_EMPTY) ?? LIST_IS_EMPTY,
        error: LIST_IS_EMPTY,
        valid: false
      }
  }
}