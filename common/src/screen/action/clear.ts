import {
  Writable,
} from 'svelte/store'

import {
  ScreenData,
  ScreenType,
} from '../types.js'

import {
  prepareFindVisibleType,
} from './find-visible-type.js'

export function prepareClear(store: Writable<ScreenData>) {
  const { update } = store
  const findVisibleType = prepareFindVisibleType(store)

  return (type: ScreenType, index?: number) : void => {
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        if (index) {
          currentValue.screens[visibleType].components = currentValue.screens[visibleType].components.splice(
            index,
            1,
            currentValue.screens[visibleType].emptyComponent
          )
        } else {
          currentValue.screens[visibleType].components = [currentValue.screens[visibleType].emptyComponent]
        }
      }

      return currentValue
    })
  }
}