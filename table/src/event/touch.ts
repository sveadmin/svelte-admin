import {
  prepareCellClicked,
} from './index.js'

import {
  getSetSelection,
} from '../handler/index.js'

import {
  getDataCellClicked,
} from '../helper/index.js'

import {
  TapBuffer,
  TableContextKey,
} from '../types.js'

export const prepareTouch = function (contextKey: TableContextKey) {
  let tapDetails: TapBuffer = {}

  const setSelection = getSetSelection(contextKey)
  const handleCellClick = prepareCellClicked(contextKey)

  const start = (event: TouchEvent) => {
    const target = getDataCellClicked(event.target as HTMLElement)

    tapDetails = {
      timer: new Date().getTime(),
      originalTarget: getDataCellClicked(target),
      lastTouchedClientX: null,
      lastTouchedClientY: null,
      lastTouchedTarget: null
    }
    setSelection({
      columnIndex: parseInt(tapDetails.originalTarget.dataset.column),
      rowIndex: parseInt(tapDetails.originalTarget.dataset.row),
      forceAnchor: true,
    })
  }

  const end = (event: TouchEvent) => {
    const target = tapDetails.lastTouchedTarget || tapDetails.originalTarget
    const eventTarget = event.target as HTMLElement
    tapDetails.lastTouchedClientX = tapDetails.lastTouchedClientY = null;
    const tapLength = new Date().getTime() - tapDetails.timer;
    if (eventTarget.nodeName === 'A'
      || eventTarget.nodeName === 'LABEL'
      || eventTarget.nodeName === 'INPUT'
      || eventTarget.nodeName === 'PRE'
      || eventTarget.nodeName === 'ROWACTION'
      || eventTarget.nodeName === 'SUGGESTEDVALUE') {
      return
    }
    if (tapLength > 500
      && (!tapDetails.lastTouchedTarget
        || tapDetails.originalTarget === tapDetails.lastTouchedTarget)) {
      handleCellClick(event)
    } else {
      event.preventDefault(); //keeps click event from being fired when taping on it
      setSelection({
        columnIndex: parseInt(target.dataset.column),
        rowIndex: parseInt(target.dataset.row),
        forceTip: !!tapDetails.lastTouchedTarget
      })
    }
  }

  const move = (event: TouchEvent) => {
    tapDetails.lastTouchedClientX = event.changedTouches[0].clientX;
    tapDetails.lastTouchedClientY = event.changedTouches[0].clientY;
    tapDetails.lastTouchedTarget = (tapDetails.lastTouchedClientX) 
      ? getDataCellClicked(document.elementFromPoint(tapDetails.lastTouchedClientX, tapDetails.lastTouchedClientY) as HTMLElement)
      : tapDetails.lastTouchedTarget;
      //TODO: ? stop propagation if touchmove was registered?
    if (tapDetails.lastTouchedTarget
      && tapDetails.lastTouchedTarget.dataset
      && tapDetails.lastTouchedTarget.dataset.column
      && tapDetails.lastTouchedTarget.dataset.row) {
      setSelection({
        columnIndex: parseInt(tapDetails.lastTouchedTarget.dataset.column),
        rowIndex: parseInt(tapDetails.lastTouchedTarget.dataset.row),
        forceAnchor: false,
        forceTip: true,
      })
    }
  }

  return {
    start,
    end,
    move,
  }
}