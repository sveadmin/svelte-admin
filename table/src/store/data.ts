import {
  get,
  writable,
  Writable,
} from 'svelte/store';

import {
  DataData,
  DataStore,
  Row,
  RowAttributes,
} from '../types.js'

export const getData = function () : DataStore {
  const store: Writable<DataData> = writable([])
  const {subscribe, set, update} = store

  function getRow (rowIndex: number) : Row | null{
    const data = get(store)
    return data[rowIndex] || null
  }

  function getRowAttributes (rowIndex: number) : RowAttributes | null {
    const data = get(store)
    return data[rowIndex] && data[rowIndex].attributes || null
  }

  function getRowProperty (rowIndex: number, property: string) : any {
    const data = get(store)
    return data[rowIndex]
      && data[rowIndex].attributes
      && data[rowIndex].attributes[property]
      || null
  }

  function updateIfChanged (updater: (currentValue: Row[]) => Row[]) : boolean {
    const data = get(store)
    const changedData = updater(JSON.parse(JSON.stringify(data)))

    const valueSame = changedData.reduce(
      (aggregator: boolean, dataRow: Row, dataIndex: number) => {
        return aggregator && Object.entries(dataRow.attributes).reduce(
          (rowAggregator: boolean, [attribute, value]) => {
            return rowAggregator && value == data[dataIndex].attributes[attribute]
        }, true)
    }, true)
    if (!valueSame) {
      set(changedData)
      return true
    }
    return false
  }

  return {
    getRow,
    getRowAttributes,
    getRowProperty,
    set,
    subscribe,
    update,
    updateIfChanged,
  }
}
