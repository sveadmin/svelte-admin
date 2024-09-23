import type {
  ScreenData,
  ScreenType,
} from '../types.js'

import {
  prepareFindVisibleType,
} from './find-visible-type.js'

export function prepareClear(store: ScreenData) {
  const findVisibleType = prepareFindVisibleType(store)

  return (type: ScreenType, index?: number) : void => {
    const visibleType = findVisibleType(type)
    if (visibleType
      && store.screens[visibleType]
      && store.screens[visibleType].components) {
      if (index) {
        store.screens[visibleType].components = store.screens[visibleType].components.splice(
          index,
          1,
          store.screens[visibleType].emptyComponent
        )
      } else {
        store.screens[visibleType].components = [store.screens[visibleType].emptyComponent]
      }
    }
  }
}