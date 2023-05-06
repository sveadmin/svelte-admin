import { getContext } from 'svelte';

export const getConditionalComponentReducer = function (contextKey, getRow, getRowId) {
  const context = getContext(contextKey)

  let originalData

  context.originalData.subscribe(value => originalData = value)

  return (aggregator, currentConditionalComponent) => {
    const row = getRow()
    const rowId = getRowId()
    if (currentConditionalComponent.condition(row.attributes, originalData[rowId] ?? {})) {
      aggregator = currentConditionalComponent.component
    }
    return aggregator
  }
}