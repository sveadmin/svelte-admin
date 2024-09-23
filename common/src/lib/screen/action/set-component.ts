import type {
  DisplayComponent,
  ScreenData,
  ScreenType,
} from '../types.js'

import {
  prepareFindVisibleType,
} from './find-visible-type.js'

export function prepareSetComponent (store: ScreenData) {
  const findVisibleType = prepareFindVisibleType(store)
  return (type: ScreenType, parameters?: DisplayComponent) : void => {
    const visibleType = findVisibleType(type)
    if (visibleType
      && parameters) {
      store.screens[visibleType].components = [parameters]
    }
  }
}