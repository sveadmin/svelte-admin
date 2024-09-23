import type {
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareSetFallbackType(store: ScreenData) {
  return (type: ScreenType, fallbackType: ScreenType) : void => {
    if (store.fallbacks) {
      store.fallbacks[type] = fallbackType
    }
  }
}