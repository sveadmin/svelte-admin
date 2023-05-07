import { getContext } from 'svelte'

import {
  COMPONENT_TEXT_DISPLAY,
} from '@sveadmin/element'

import {
  prepareConditionalComponentReducer
} from './index.js'

import {
  DataData,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareColumnReducer = function (
  contextKey: TableContextKey,
) {
  const context = getContext(contextKey) as TableContext

  const {
    components,
    data,
    getKey,
  } = context

   let settings: SettingsData

   context.settings.subscribe(currentValue => settings = currentValue)

  const conditionalComponentReducer = prepareConditionalComponentReducer(contextKey)
  return (rowIndex: number) => {
    const rowId = getKey(data.getRow(rowIndex).attributes)
    settings.map((columnSettings, columnIndex) => {
      if (components.exists(rowId, columnIndex)) {
        return
      }
      if (columnSettings.conditionalComponent) {
        components.setByIndex(
          rowId,
          columnIndex,
          conditionalComponentReducer(rowIndex, columnIndex)
        )
      } else {
        components.setByIndex(
          rowId,
          columnIndex,
          columnSettings.type ?? COMPONENT_TEXT_DISPLAY
        )
      }
    })
  }
}