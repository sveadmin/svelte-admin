import type {
  Rune,
} from '@sveadmin/common'

import {
  focusNext,
} from '$lib/helper/index.js'

export function preparePushExtraCharactersToNext(boundValue : Rune<string[]>, length: number) {
    return (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    if (target.value.length >= 4) {
      const next = focusNext(target)
      const nextIndex: number = parseInt(next?.dataset?.index || '-1')

      if (nextIndex > -1) {
        boundValue.value[nextIndex] = boundValue.value[nextIndex - 1].substring(4)
        boundValue.value[nextIndex - 1] = boundValue.value[nextIndex - 1].substring(0, 4)
      }
      
      return
    }
  }
}