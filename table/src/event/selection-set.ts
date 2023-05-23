import {
  getDataCellClicked
} from '../helper/index.js'

import {
  getSetSelection
} from '../handler/index.js'

import {
  TableContext,
  TableContextKey,
} from '../types.js'

export const prepareSelectionSet = function (contextKey: TableContextKey) {
  const setSelection = getSetSelection(contextKey)
  return function (event) {
    const target = getDataCellClicked(event.target)
    if (!target || !target.dataset) {
      return;
    }

    switch (event.type) {
      case 'click':
        setSelection({
          columnIndex: parseInt(target.dataset.column),
          rowIndex: parseInt(target.dataset.row)
        })
        break
    }
  }
}