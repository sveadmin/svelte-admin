import { getContext } from 'svelte';
import { 
  comparator,
  getColumnReducer,
} from './'


export const prepareRowReducer = function (contextKey, getKey) {
  const context = getContext(contextKey)

  const rowKeys = context.rowKeys,
    rowMeta = context.rowMeta,
    rowSelection = context.rowSelection

  let originalData,
    rowMetaValue,
    settings

  context.originalData.subscribe(value => originalData = value)
  context.rowMeta.subscribe(value => rowMetaValue = value)
  context.settings.subscribe(value => settings = value)


  let rowData = {
    row: null,
    rowId: null,
  }

  const getRow = () => {
    return rowData.row
  }

  const getRowId = () => {
    return rowData.rowId
  }


  const columnReducer = getColumnReducer(contextKey, getRow, getRowId)

  return (aggregator, row) => {
    rowData.row = row
    const rowId = rowData.rowId = getKey(row.attributes);

    if (!originalData[rowId]) {
      originalData[rowId] = Object.entries(row.attributes).reduce((aggregator, [index, value]) => {
        aggregator[index] = comparator(value)
        return aggregator
      }, {});
    }
    settings.columns.map(columnReducer)
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

  }
}