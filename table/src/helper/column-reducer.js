import { getContext } from 'svelte';
import { getConditionalComponentReducer } from './'

export const getColumnReducer = function (contextKey, getRow, getRowId) {
  const context = getContext(contextKey)

  const {
    components
  } = context

  // let components

  const conditionalComponentReducer = getConditionalComponentReducer(contextKey, getRow, getRowId)
  return (columnSetting, columnIndex) => {
    const rowId = getRowId()


    if (columnSetting.conditionalComponent
      || !components.exists(rowId, columnIndex)) {
      if (columnSetting.conditionalComponent) {
        let currentType = columnSetting.conditionalComponent.reduce(
          conditionalComponentReducer,
          columnSetting.type ?? 'display-text'
        )
        components.setByIndex(rowId, columnIndex, currentType)
      } else {
        components.setByIndex(rowId, columnIndex, columnSetting.type ?? 'display-text')
      }
    }
  }
}