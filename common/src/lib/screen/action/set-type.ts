import type {
  Screen,
  ScreenData,
  ScreenType,
} from '../types.js'

export function prepareSetType (store: ScreenData) {
  return (type: ScreenType, screen?: Screen) : void => {
    const {
      components = [],
      emptyComponent,
      fallbackType,
      type: screnType
    } = screen || {}
    store.screens[type] = {
      components,
      emptyComponent,
      type,
    }
    if (fallbackType
      && store.fallbacks
      && screnType) {
      store.fallbacks[screnType] = fallbackType
    }
  }
}