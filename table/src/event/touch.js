import {
  getCellClicked,
} from './'
import {
  getSetSelection,
} from '../handler'
import { getDataCellClicked } from '../helper'

export const getTouch = function (contextKey) {
  let tapDetails = {
    timer: 0,
    originalTarget: null,
    lastTouchedClientX: null,
    lastTouchedClientY: null,
    lastTouchedTarget: null
  }

  const setSelection = getSetSelection(contextKey)
  const handleCellClick = getCellClicked(contextKey)

  const start = (event) => {
    tapDetails = {
      timer: new Date().getTime(),
      originalTarget: getDataCellClicked(event.target),
      lastTouchedClientX: null,
      lastTouchedClientY: null,
      lastTouchedTarget: null
    }
    setSelection({
      columnIndex: tapDetails.originalTarget.dataset.column,
      rowIndex: tapDetails.originalTarget.dataset.row,
      forceAnchor: true,
    })
  }

  const end = (event) => {
    const target = tapDetails.lastTouchedTarget || tapDetails.originalTarget
    tapDetails.lastTouchedClientX = tapDetails.lastTouchedClientY = null;
    const tapLength = new Date().getTime() - tapDetails.timer;
  // console.log('touch.js', event.target.nodeName)
    if (event.target.nodeName === 'A'
      || event.target.nodeName === 'LABEL'
      || event.target.nodeName === 'INPUT'
      || event.target.nodeName === 'PRE'
      || event.target.nodeName === 'ROWACTION'
      || event.target.nodeName === 'SUGGESTEDVALUE') {
      return
    }
    if (tapLength > 500
      && (!tapDetails.lastTouchedTarget
        || tapDetails.originalTarget === tapDetails.lastTouchedTarget)) {
      handleCellClick(event)
    } else {
      event.preventDefault(); //keeps click event from being fired when taping on it
      setSelection({
        columnIndex: target.dataset.column,
        rowIndex: target.dataset.row,
        forceTip: !!tapDetails.lastTouchedTarget
      })
    }
  }

  const move = (event) => {
    tapDetails.lastTouchedClientX = event.changedTouches[0].clientX;
    tapDetails.lastTouchedClientY = event.changedTouches[0].clientY;
    tapDetails.lastTouchedTarget = (tapDetails.lastTouchedClientX) 
      ? getDataCellClicked(document.elementFromPoint(tapDetails.lastTouchedClientX, tapDetails.lastTouchedClientY))
      : tapDetails.lastTouchedTarget;
      //TODO: ? stop propagation if touchmove was registered?
    if (tapDetails.lastTouchedTarget
      && tapDetails.lastTouchedTarget.dataset
      && tapDetails.lastTouchedTarget.dataset.column
      && tapDetails.lastTouchedTarget.dataset.row) {
      setSelection({
        columnIndex: tapDetails.lastTouchedTarget.dataset.column,
        rowIndex: tapDetails.lastTouchedTarget.dataset.row,
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