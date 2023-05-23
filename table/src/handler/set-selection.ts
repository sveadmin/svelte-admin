import {
  getContext
} from 'svelte'

import {
  SelectionData,
  SelectionUpdateParameter,
  TableContext,
  TableContextKey,
} from '../types.js'

export const getSetSelection = function (contextKey: TableContextKey) : ((parameters: SelectionUpdateParameter) => void ) {
  const {
    selection,
  } = getContext(contextKey) as TableContext

  let selectionValues: SelectionData

  selection.subscribe(value => selectionValues = value)

  return (parameters: SelectionUpdateParameter) => {
    const {
      columnIndex,
      rowIndex,
      forceAnchor = false,
      forceTip = false
    } = parameters

    if (forceAnchor) {
      selection.clearAnchor()
      selection.setAnchorBase(columnIndex, rowIndex)
      return
    }

    if (forceTip) {
      selection.setAnchorTip(columnIndex, rowIndex)
      return
    }

    if (selection.isInside(columnIndex, rowIndex)) {
      return
    }

    if (!selectionValues.anchorBaseRow) {
      selection.setAnchorBase(columnIndex, rowIndex)
      return
    }

    if (!selectionValues.anchorTipRow) {
      selection.setAnchorTip(columnIndex, rowIndex)
      return
    }

    selection.clearAnchor()
  }
}