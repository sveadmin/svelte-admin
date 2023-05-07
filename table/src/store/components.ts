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
  RowKey,
} from '../types.js'

export const getComponents = function () : ComponentStore {
  const store: Writable<ComponentData> = writable({})

  const {subscribe, set, update} = store

  function exists (rowId: RowKey, columnIndex: number) : boolean {
    const components = get(store)
    return !!(components[rowId] && components[rowId][columnIndex])
  }

  function getByIndex (rowId: RowKey, columnIndex: number) : Component | null {
    const components = get(store)
    return components[rowId] && components[rowId][columnIndex] || null
  }

  function setByIndex (
    rowId: RowKey,
    columnIndex: number,
    component: Component
  ) : void {
    update(currentValue => {
      if (!currentValue[rowId]) {
        currentValue[rowId] = []
      }
      currentValue[rowId][columnIndex] = component
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
