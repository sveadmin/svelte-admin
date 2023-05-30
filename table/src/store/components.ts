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
  ComponentElementStore,
  ComponentStore,
  ComponentStoreConstructor,
  RowKey,
} from '../types.js'

export const getComponents = function (parameters: ComponentStoreConstructor = {}) : ComponentStore {
  const {
    initialValue = {}
  } = parameters

  const initialValueWithStores = Object.keys(initialValue).reduce(
    (aggregator: ComponentData, rowKey: RowKey) => {
      aggregator[rowKey] = initialValue[rowKey].map((component: Component) => writable(component))
      return aggregator
    },
    {}
  )

  const store: Writable<ComponentData> = writable(initialValueWithStores)

  const {subscribe, set, update} = store

  function exists (rowId: RowKey, columnIndex: number) : boolean {
    const components = get(store)
    return !!(components[rowId] && components[rowId][columnIndex])
  }

  function getByIndex (rowId: RowKey, columnIndex: number) : ComponentElementStore | null {
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
      currentValue[rowId][columnIndex] = writable(component)
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
