import type {
  Rune,
} from '@sveadmin/common'

import {
  focusNext,
} from '$lib/helper/index.js'

export function preparePushExtraCharactersToNext(boundValue : Rune<string[]>, length: number) {
    return (event: KeyboardEvent) : boolean => {
    const target = event.target as HTMLInputElement
    if (target.value.length >= length) {
      const next = focusNext(target)
      const nextIndex: number = parseInt(next?.dataset?.index || '-1')

      if (target.value.length > length
        && nextIndex > -1
        && (boundValue.value[nextIndex] === ''
          || boundValue.value[nextIndex] === null)) {
        boundValue.value[nextIndex] = boundValue.value[nextIndex - 1].substring(length)
        boundValue.value[nextIndex - 1] = boundValue.value[nextIndex - 1].substring(0, length)
      }
      
      return true
    }
    return true
  }
}