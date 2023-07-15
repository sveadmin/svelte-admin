import {
  get,
  writable,
  Writable,
} from 'svelte/store';

import {
  CellComponent,
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
      aggregator[rowKey] = initialValue[rowKey].map((component: CellComponent) => writable(component))
      return aggregator
    },
    {}
  )

  const store: Writable<ComponentData> = writable(initialValueWithStores)

  const {subscribe, set, update} = store

  function exists (columnIndex: number, rowId: RowKey) : boolean {
    const components = get(store)
    return !!(components[rowId] && components[rowId][columnIndex])
  }

  function getByIndex (columnIndex: number, rowId: RowKey) : ComponentElementStore | null {
    const components = get(store)
    return components[rowId] && components[rowId][columnIndex] || null
  }

  function setByIndex (
    columnIndex: number,
    rowId: RowKey,
    component: CellComponent
  ) : void {
    update(currentValue => {
      if (!currentValue[rowId]) {
        currentValue[rowId] = []
      }
      if (!currentValue[rowId][columnIndex]) {
        currentValue[rowId][columnIndex] = writable(component)
      } else {
        currentValue[rowId][columnIndex].update(() => component)
      }
       
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
