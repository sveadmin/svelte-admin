import {
  Writable,
} from 'svelte/store'

import {
  DisplayComponent,
  ScreenData,
  ScreenType,
} from '../types.js'

import {
  prepareFindVisibleType,
} from './find-visible-type.js'

export function prepareSetComponent (store: Writable<ScreenData>) {
  const { update } = store
  const findVisibleType = prepareFindVisibleType(store)
  return (type: ScreenType, parameters?: DisplayComponent) : void => {
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        currentValue.screens[visibleType].components = [parameters]
      }

      return currentValue
    })
  }
}