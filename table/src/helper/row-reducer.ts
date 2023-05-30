import { getContext } from 'svelte';
import { 
  comparator,
  prepareColumnReducer,
} from './index.js'

import {
  DataData,
  GetKey,
  OriginalDataData,
  Row,
  RowAttributes,
  RowMetaData,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'


export const prepareRowReducer = function (contextKey: TableContextKey) : {(currentValue: DataData) : void} {
  const context = getContext(contextKey) as TableContext

  const {
    getKey,
    rowKeys,
    rowMeta,
    rowSelection,
  } = context

  let originalData: OriginalDataData,
    rowMetaValue: RowMetaData

  context.originalData.subscribe(value => originalData = value)
  context.rowMeta.subscribe(value => rowMetaValue = value)

  const columnReducer = prepareColumnReducer(contextKey)

  return (currentValue: DataData) : void=> {

    currentValue.map((row, rowIndex) => {
      const rowId = getKey(row.attributes);
      if (!originalData[rowId]) {
        originalData[rowId] = Object.entries(row.attributes)
          .reduce((aggregator: RowAttributes, [index, value]) => {
          aggregator[index] = comparator(value)
          return aggregator
        }, {});
      }

      columnReducer(rowIndex)

      rowKeys.update(currentValue => currentValue.concat(rowId))
      if (!rowMeta.has(rowId)) {
          rowMeta.update((currentValue) => {
            currentValue[rowId] = {
              dirty: false,
              selected: false,
              saving: false,
              status: null
            }
            return currentValue
          })
      }

      rowSelection.update((currentValue) => {
        if (rowMetaValue[rowId]) {
          currentValue.partiallyChecked = currentValue.partiallyChecked || rowMetaValue[rowId].selected;
          currentValue.allChecked = currentValue.allChecked && rowMetaValue[rowId].selected;
        }
        return currentValue
      })

    })
  }
}