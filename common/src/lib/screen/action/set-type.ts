import {
  Writable,
} from 'svelte/store'

import {
  Screen,
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareSetType (store: Writable<ScreenData>) {
  const { update } = store
  return (type: ScreenType, screen?: Screen) : void => {
    const {
      components = [],
      emptyComponent,
      fallbackType,
    } = screen || {}
    update(currentValue => {
      currentValue.screens[type] = {
        components,
        emptyComponent,
        type,
      }
      if (fallbackType) {
        currentValue.fallbacks[screen.type] = fallbackType
      }
      return currentValue
    })
  }
}