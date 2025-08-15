import {
  rune,
} from '@sveadmin/common'

import type {
  AnyValidator,
  IsValid,
  ValueFallback,
} from '@sveadmin/common'

import {
  creditCardChecksum,
} from '../helper/credit-card-checksum.js'

export function creditCardValidator (data?: ValueFallback): (params: AnyValidator |  any) => IsValid {
  return function (parameters?: AnyValidator | any) : IsValid {
    let value = (parameters && parameters.hasOwnProperty('value'))
      ? parameters.value
      : parameters
    if (!value
      && parameters?.data?.valueFallback) {
      value = (typeof parameters?.data?.valueFallback === 'function') ? parameters.data.valueFallback() : parameters.data.valueFallback  
    }
    if (!value
      && data?.valueFallback) {
      value = (typeof data?.valueFallback === 'function') ? data.valueFallback() : data.valueFallback  
    }

    if (typeof value === 'string') {
      value = [
        value.substring(0, 3),
        value.substring(4, 7),
        value.substring(8, 11),
        value.substring(12, 15)
      ]
    }

    if (!value.hasOwnProperty('isRune')) {
      value = rune(value)
    }

    return creditCardChecksum(value)
  }
}