import {
  prepareSwitchToEditor,
} from '../action/index.js'

import {
  getDataCellClicked,
} from '../helper/index.js'

import {
  TableContextKey,
} from '../types.js'

export const prepareCellClicked = function (contextKey: TableContextKey): ((event: Event) => void) {
  const switchToEditor = prepareSwitchToEditor(contextKey)

  return (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'F2') {
      return
    }
    const target = getDataCellClicked(event.target as HTMLElement)
    const columnIndex: number = parseInt(target.dataset.column)
    const rowIndex: number = parseInt(target.dataset.row)

    const editorSwitched = switchToEditor(columnIndex, rowIndex)

    if (!editorSwitched) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
  }
}