import { getContext } from 'svelte'

export const getMasterCheckboxClicked = function (contextKey) {
  const context = getContext(contextKey)

  const rowMeta = context.rowMeta,
    savedSelection = context.savedSelection

  let rowKeys,
    rowMetaValue,
    rowSelection,
    savedSelectionValue

  context.rowKeys.subscribe(value => rowKeys = value)
  context.rowMeta.subscribe(value => rowMetaValue = value)
  context.rowSelection.subscribe(value => rowSelection = value)
  context.savedSelection.subscribe(value => savedSelectionValue = value)

  return () => {
    switch (true) {
      case !rowSelection.allChecked
        && !rowSelection.partiallyChecked:
        rowKeys.map((rowId) => {
          rowMeta.updateProperty(
            rowId,
            'selected',
            savedSelectionValue.length === 0 || savedSelectionValue.includes(rowId)
          )
        })
        break;
      case rowSelection.partiallyChecked:
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
        break;
      case rowSelection.allChecked:
        rowKeys.map((rowId) => {
          rowMeta.updateProperty(rowId, 'selected', false)
        })
    }
  }
}