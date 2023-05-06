import { getContext } from 'svelte';

export const getSetSelection = function (contextKey) {
  const context = getContext(contextKey)

  const selection = context.selection
  
  let selectionValues

  selection.subscribe(value => selectionValues = value)

  return ({
    columnIndex,
    rowIndex,
    forceAnchor = false,
    forceTip = false
  }) => {
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