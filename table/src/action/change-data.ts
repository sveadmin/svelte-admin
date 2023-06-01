import {
  getContext,
} from 'svelte'


import {
  ComponentData,
  DataData,
  ROW_META_DIRTY,
  RowKeyData,
  TableContext,
  TableContextKey,
} from '../types.js'

import {
  prepareUpdateMeta,
} from '../handler/index.js'

export const prepareChangeData = (contextKey: TableContextKey) : ((
  column: string,
  rowIndex: number,
  value: any
) => void) => {

  const updateMeta = prepareUpdateMeta(contextKey)

  const context = getContext(contextKey) as TableContext

  const {
    components,
    data,
    getKey,
    rowKeys,
  } = context

  return (
    column: string,
    rowIndex: number,
    value: any
  ) : void => {
    const attributes = data.getRowAttributes(rowIndex)
    const currentKey = getKey(attributes)
    const changed = data.updateIfChanged((currentValue: DataData) : DataData => {
      currentValue[rowIndex].attributes[column] = value

      return currentValue
    })

    if (changed) {
      updateMeta(
        attributes,
        ROW_META_DIRTY,
        true
      )

      const newKey = getKey(data.getRowAttributes(rowIndex))
      if (newKey !== currentKey) {
        components.update((currentValue: ComponentData) => {
          currentValue[newKey] = currentValue[currentKey]
          delete currentKey[currentKey]
          return currentValue
        })
        rowKeys.update((currentValue: RowKeyData) => {
          currentValue[rowIndex] = newKey
          return currentValue
        })
      }
    }
  }
}