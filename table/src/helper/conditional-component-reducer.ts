import { getContext } from 'svelte'

import {
  Component,
  COMPONENT_TEXT_DISPLAY,
} from '@sveadmin/element'

import {
  ComponentConditionSetting,
  DataData,
  OriginalDataData,
  SettingsData,
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareConditionalComponentReducer = function (
  contextKey: TableContextKey,
) {
  const context = getContext(contextKey) as TableContext

  const {
    data,
    getKey,
  } = context

  let originalData : OriginalDataData,
    settings: SettingsData

  context.originalData.subscribe(value => originalData = value)
  context.settings.subscribe(value => settings = value)

  return (rowIndex: number, columnIndex: number) => {
    const row = data.getRow(rowIndex)
    const rowId = getKey(row.attributes)
    return settings[columnIndex].conditionalComponent.reduce(
      (aggregator: Component, currentConditionalComponent: ComponentConditionSetting) => {
        if (currentConditionalComponent.condition(row.attributes, originalData[rowId] ?? {})) {
          aggregator = currentConditionalComponent.component
        }
        return aggregator
      },
      settings[columnIndex].type ?? COMPONENT_TEXT_DISPLAY
    )
  }
}