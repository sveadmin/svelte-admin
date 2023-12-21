import {
  getContext
} from 'svelte'

import {
  DataData,
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

  let data: DataData,
    rowKeys: RowKeyData,
    rowMetaValue: RowMetaData,
    rowSelection: RowSelectionData,
    savedSelectionValue: SavedSelectionData

  context.data.subscribe(value => data = value)
  context.rowKeys.subscribe(value => rowKeys = value)
  context.rowMeta.subscribe(value => rowMetaValue = value)
  context.rowSelection.subscribe(value => rowSelection = value)
  context.savedSelection.subscribe(value => savedSelectionValue = value)

  return () : void => {
    let savedSelectionFound = false //It is possible that the saved seletion is not on the current page
    if (!rowSelection.allChecked
      && !rowSelection.partiallyChecked) {
      rowKeys.map((rowId: RowKey) => {
        savedSelectionFound = savedSelectionFound || savedSelectionValue.includes(rowId)
        const savedSelection = savedSelectionValue.length === 0 || savedSelectionValue.includes(rowId)
        rowMeta.updateProperty(
          rowId,
          'selected',
          savedSelection
        )
      })
      if (savedSelectionValue.length === 0
        || savedSelectionFound) {
        return
      }
    }

    if (rowSelection.allChecked) {
      rowKeys.map((rowId) => {
        rowMeta.updateProperty(rowId, 'selected', false)
      })
      return
    }

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
  }
}