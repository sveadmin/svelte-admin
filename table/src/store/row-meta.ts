import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  RowMetaData,
  RowMetaStore,
} from '../types.js'

export const getRowMeta = () : RowMetaStore => {
  const store : Writable<RowMetaData> = writable({})
  const {subscribe, set, update } = store

  const has = (rowId: string) : boolean => {
    const rowMeta = get(store)
    return !!rowMeta[rowId]
  }

  const updateProperty = (
    rowId: string,
    key: string,
    value: any
  ) : void => {
    update((currentValue) => {
      if (!currentValue[rowId]) {
        currentValue[rowId] = {}
      }
      currentValue[rowId][key] = value
      return currentValue
    })
  }

  return {
    has,
    update,
    updateProperty,
    set,
    subscribe
  }
}