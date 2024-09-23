import type {
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareFindVisibleType(store: ScreenData) {
  const finder = (type: ScreenType) : ScreenType | null => {
    if (store.screens[type]) {
      return type
    }
    if (store.fallbacks && store.fallbacks[type]) {
      return finder(store.fallbacks[type])
    }
    return null
  }

  return finder
}