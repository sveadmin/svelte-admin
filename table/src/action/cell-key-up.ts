import {
  getContext,
} from 'svelte'

import {
  Component,
  COMPONENT_TEXT_DISPLAY
} from '@sveadmin/element'

import {
  TableContext,
  TableContextKey,
} from '../types.js'


  import {
    prepareChangeData,
  } from './index.js'

export const prepareCellKeyUp = (
  baseComponent: Component = COMPONENT_TEXT_DISPLAY,
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
  return (event: CustomEvent<KeyboardEvent>) : void => {
    const keyboardEvent = event.detail
    if (keyboardEvent.key !== 'Enter'
      && keyboardEvent.key !== 'Escape') {
      return
    }

    if (keyboardEvent.key === 'Enter') {
      const target = keyboardEvent.target as HTMLInputElement
      changeData(
        column,
        rowIndex,
        target.value
      )
    }

    components.setByIndex(
      columnIndex,
      rowKey,
      baseComponent
    )
  }
}

