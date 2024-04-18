import {
  get,
  Writable,
} from 'svelte/store';

import {
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareFindVisibleType(store: Writable<ScreenData>) {
  const finder = (type: ScreenType) : ScreenType => {
    const data = get(store)
    if (data.screens[type]) {
      return type
    }
    if (data.fallbacks[type]) {
      return finder(data.fallbacks[type])
    }
    return null
  }

  return finder
}