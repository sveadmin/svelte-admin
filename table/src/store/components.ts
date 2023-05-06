import {
  get,
  writable,
  Writable,
} from 'svelte/store';

import {
  Component,
} from '@sveadmin/element'

import {
  ComponentData,
  ComponentStore,
} from '../types.js'

export const getComponents = function () : ComponentStore {
  const store: Writable<ComponentData> = writable([])

  const {subscribe, set, update} = store

  function exists (rowIndex: number, columnIndex: number) : boolean {
    const components = get(store)
    return !!(components[rowIndex] && components[rowIndex][columnIndex])
  }

  function getByIndex (rowIndex: number, columnIndex: number) : Component | null {
    const components = get(store)
    return components[rowIndex] && components[rowIndex][columnIndex] || null
  }

  function setByIndex (
    rowIndex: number,
    columnIndex: number,
    component: Component
  ) : void {
    update(currentValue => {
      if (!currentValue[rowIndex]) {
        currentValue[rowIndex] = []
      }
      currentValue[rowIndex][columnIndex] = component
      return currentValue
    })
  }

  return {
    exists,
    getByIndex,
    set,
    setByIndex,
    subscribe,
    update,
  }
}
