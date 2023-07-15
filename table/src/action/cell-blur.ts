import {
  getContext,
} from 'svelte'

import {
  COMPONENT_TEXT_DISPLAY
} from '@sveadmin/element'

import {
  CellComponent,
  TableContext,
  TableContextKey,
} from '../types.js'


  import {
    prepareChangeData,
  } from './index.js'

export const prepareCellBlur = (
  baseComponent: CellComponent = COMPONENT_TEXT_DISPLAY,
  contextKey: TableContextKey,
  column: string,
  rowIndex: number,
) : ((event: CustomEvent<KeyboardEvent>) => void) => {
  const {
    components,
    data,
    getKey,
    settings
  } = getContext(contextKey) as TableContext

  const columnIndex = settings.getColumnPosition(column)
  const rowKey = getKey(data.getRowAttributes(rowIndex))

  const changeData = prepareChangeData(contextKey)

  return (event: CustomEvent<Event>) : void => {
    const target = event.detail.target as HTMLInputElement

    changeData(
      column,
      rowIndex,
      target.value
    )

    components.setByIndex(
      columnIndex,
      rowKey,
      baseComponent
    )
  }
}

