import { getDataCellClicked } from '../helper'
import { getSetSelection } from '../handler'

export const getSelectionSet = function (contextKey) {
  const setSelection = getSetSelection(contextKey)
  return function (event) {
    const target = getDataCellClicked(event.target)
    if (!target || !target.dataset) {
      return;
    }

    switch (event.type) {
      case 'click':
        setSelection({
          columnIndex: target.dataset.column,
          rowIndex: target.dataset.row
        })
        break
    }
  }
}