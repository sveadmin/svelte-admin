import {
  getContext
} from 'svelte'

import {
  getDataCellClicked,
} from '../helper/index.js'

import {
  ComponentData,
  DataData,
  OriginalDataData,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareCellClicked = function (contextKey: TableContextKey): ((event: Event) => void) {
  const context = getContext(contextKey) as TableContext

  const editors = context.editors,
    getKey = context.getKey
    
  let components: ComponentData,
    data: DataData = [],
    originalData: OriginalDataData = {},
    settings: SettingsData = []

  context.data.subscribe(value => data = value)
  context.originalData.subscribe(value => originalData = value)
  context.components.subscribe(value => components = value)
  context.settings.subscribe(value => settings = value)

  return (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'F2') {
      return
    }
    const target = getDataCellClicked(event.target as HTMLElement)
    const rowIndex: number = parseInt(target.dataset.row)
    const columnIndex: number = parseInt(target.dataset.column)
    if (settings[columnIndex]
      && editors.has(settings[columnIndex].id)) {
      const columnId = settings[columnIndex].id
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