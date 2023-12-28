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
  SETTING_CONDITIONAL_COMPONENT,
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
      // if (components.exists(columnIndex, rowId)
      //   && !columnSettings.conditionalComponent) {
      //   return
      // }
      if (columnSettings[SETTING_CONDITIONAL_COMPONENT]) {
        components.setByIndex(
          columnIndex,
          rowId,
          conditionalComponentReducer(rowIndex, columnIndex)
        )
      } else {
        components.setByIndex(
          columnIndex,
          rowId,
          columnSettings.type ?? COMPONENT_TEXT_DISPLAY
        )
      }
    })
  }
}