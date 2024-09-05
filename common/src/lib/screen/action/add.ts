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

export function prepareAdd(store: Writable<ScreenData>) {
  const { update } = store
  const findVisibleType = prepareFindVisibleType(store)
  return (type: ScreenType, parameters: DisplayComponent) : void =>{
    update(currentValue => {
      const visibleType = findVisibleType(type)
      if (visibleType) {
        currentValue.screens[visibleType].components.push(parameters)
      }

      return currentValue
    })
  }

}