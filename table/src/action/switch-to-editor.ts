import {
  getContext,
} from 'svelte'

import {
  ComponentData,
  DataData,
  OriginalDataData,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareSwitchToEditor = (contextKey: TableContextKey) : ((columnIndex: number, rowIndex: number) => boolean) => {
  const context = getContext(contextKey) as TableContext

  const actions = context.actions,
    components = context.components,
    getKey = context.getKey
    
  let componentsData: ComponentData,
    data: DataData = [],
    originalData: OriginalDataData = {},
    settings: SettingsData = []

  context.data.subscribe(value => data = value)
  context.originalData.subscribe(value => originalData = value)
  context.components.subscribe(value => componentsData = value)
  context.settings.subscribe(value => settings = value)

  return (columnIndex: number, rowIndex: number) : boolean => {
    const column = settings[columnIndex].id
    const editor = actions.getEditor(column)
    if (!editor
      || !data[rowIndex]) {
      return false
    }
    const rowKey = getKey(data[rowIndex].attributes)

    if (editor.condition
      && !editor.condition(
          data[rowIndex].attributes,
          originalData[rowKey]
        )) {
      return
    }

    if (editor.inline) {
      components.setByIndex(
        columnIndex,
        rowKey,
        editor.inline
      )
      return true
    }

    return true
  }
}