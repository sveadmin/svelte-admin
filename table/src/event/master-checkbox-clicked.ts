import {
  getContext
} from 'svelte'

import {
  RowKey,
  RowKeyData,
  RowMetaData,
  RowSelectionData,
  SavedSelectionData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareMasterCheckboxClicked = function (contextKey: TableContextKey) : (() => void) {
  const context = getContext(contextKey) as TableContext

  const rowMeta = context.rowMeta,
    savedSelection = context.savedSelection

  let rowKeys: RowKeyData,
    rowMetaValue: RowMetaData,
    rowSelection: RowSelectionData,
    savedSelectionValue: SavedSelectionData

  context.rowKeys.subscribe(value => rowKeys = value)
  context.rowMeta.subscribe(value => rowMetaValue = value)
  context.rowSelection.subscribe(value => rowSelection = value)
  context.savedSelection.subscribe(value => savedSelectionValue = value)

  return () : void => {
    if (!rowSelection.allChecked
      && !rowSelection.partiallyChecked) {
      rowKeys.map((rowId: RowKey) => {
        rowMeta.updateProperty(
          rowId,
          'selected',
          savedSelectionValue.length === 0 || savedSelectionValue.includes(rowId)
        )
      })
      return
    }

    if (rowSelection.partiallyChecked) {
      savedSelection.set(rowKeys.reduce(
        (aggregator, rowId) => {
          if (rowMetaValue[rowId].selected) {
            aggregator.push(rowId);
          }
          rowMeta.updateProperty(rowId, 'selected', true)
          return aggregator;
        },
        []
      ))
    } else {
      rowKeys.map((rowId) => {
        rowMeta.updateProperty(rowId, 'selected', false)
      })
    }
  }
}