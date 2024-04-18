import {
  Writable,
} from 'svelte/store'

import {
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareSetFallbackType(store: Writable<ScreenData>) {
  const { update } = store
  return (type: ScreenType, fallbackType: ScreenType) : void => {
    update(currentValue => {
      currentValue.fallbacks[type] = fallbackType
      return currentValue
    })
  }
}