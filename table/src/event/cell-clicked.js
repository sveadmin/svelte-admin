import { getContext } from 'svelte'
import { getDataCellClicked } from '../helper'

export const getCellClicked = function (contextKey) {
  const context = getContext(contextKey)

  const editors = context.editors,
    getKey = context.getKey
    
  let components,
    data = [],
    originalData = {},
    settings = []

  context.data.subscribe(value => data = value)
  context.originalData.subscribe(value => originalData = value)
  context.components.subscribe(value => components = value)
  context.settings.subscribe(value => settings = value)

  return (event) => {
    const target = getDataCellClicked(event.target)
    const {row: rowIndex, column: columnIndex} = target.dataset;
    if (settings.columns[columnIndex]
      && editors.has(settings.columns[columnIndex].id)) {
      const columnId = settings.columns[columnIndex].id
      const key = getKey(data[rowIndex].attributes)

      if (!editors.checkCondition(
            columnId,
            data[rowIndex].attributes,
            originalData[key]
          )) {
        return
      }

      event.preventDefault
      event.stopPropagation
      editors.get(columnId)(
        {
          columnIndex,
          component: components[key][columnIndex],
          row: data[rowIndex] ?? '',
          rowIndex,
        }
      );
    }
  }
}