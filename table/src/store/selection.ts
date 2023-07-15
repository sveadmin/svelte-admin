import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  noop,
} from 'svelte/internal'

import {
  SelectionData,
  SelectionStore,
} from '../types.js'

export const getSelection = (parameters: SelectionData = {}) : SelectionStore => {
  const {
    left = null,
    top = null,
    right = null,
    bottom = null,
    anchorBaseColumn = null,
    anchorBaseRow = null,
    anchorTipColumn = null,
    anchorTipRow = null,

  } = parameters

  const store: Writable<SelectionData> = writable({
    left,
    top,
    right,
    bottom,
    anchorBaseColumn,
    anchorBaseRow,
    anchorTipColumn,
    anchorTipRow,
  })

  const {subscribe, set, update} = store

  const setLeftTop = (left: number, top: number) : void => {
    update(currentValue => {
      currentValue.left = left
      currentValue.top = top
      return currentValue
    })
  }

  const setRightBottom = (right: number, bottom: number) : void => {
    update(currentValue => {
      currentValue.right = right
      currentValue.bottom = bottom
      return currentValue
    })
  }

  const clearAnchor = () : void => {
    update(currentValue => {
      currentValue.anchorBaseColumn = null
      currentValue.anchorBaseRow = null
      currentValue.anchorTipColumn = null
      currentValue.anchorTipRow = null
      currentValue.left = null
      currentValue.top = null
      currentValue.right = null
      currentValue.bottom = null
      return currentValue
    })
  }

  const setAnchorBase = (colmnIndex: number, rowIndex: number) : void => {
    update(currentValue => {
      currentValue.anchorBaseColumn = colmnIndex
      currentValue.anchorBaseRow = rowIndex
      return currentValue
    })
    setLeftTop(
      colmnIndex,
      rowIndex,
    )
    setRightBottom(
      colmnIndex,
      rowIndex,
    )
  }

  const setAnchorTip = (colmnIndex: number, rowIndex: number) : void => {
    const data = get(store)
    update(currentValue => {
      currentValue.anchorTipColumn = colmnIndex
      currentValue.anchorTipRow = rowIndex

      return currentValue
    })
    setLeftTop(
      (data.anchorTipColumn <data.anchorBaseColumn) ? data.anchorTipColumn : data.anchorBaseColumn,
      (data.anchorTipRow < data.anchorBaseRow) ? data.anchorTipRow : data.anchorBaseRow,
    )
    setRightBottom(
      (data.anchorTipColumn < data.anchorBaseColumn) ? data.anchorBaseColumn : data.anchorTipColumn,
      (data.anchorTipRow < data.anchorBaseRow) ? data.anchorBaseRow : data.anchorTipRow,
    )
  }

  const isInside = (column: number, row: number) : boolean => {
    const data = get(store)
    if (!data.top
      || !data.bottom) {
      return false
    }
    return data.left <= column
      && data.top <= row
      && data.right >= column
      && data.bottom >= row
  }

  return {
    clearAnchor,
    isInside,
    set,
    setAnchorBase,
    setAnchorTip,
    setLeftTop,
    setRightBottom,
    subscribe,
    update: noop,
  }
}