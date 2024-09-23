import type {
  DisplayComponent,
  ScreenData,
  ScreenType,
} from '../types.js'

import {
  prepareFindVisibleType,
} from './find-visible-type.js'

export function prepareAdd(store: ScreenData) {
  const findVisibleType = prepareFindVisibleType(store)
  return (type: ScreenType, parameters: DisplayComponent) : void =>{
    const visibleType = findVisibleType(type)
    if (visibleType
        && store.screens[visibleType]
        && store.screens[visibleType].components) {
      store.screens[visibleType].components.push(parameters)
    }
  }

}