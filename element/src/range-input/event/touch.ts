import {
  noop,
} from 'svelte/internal'

import {
  TapBuffer,
} from '@sveadmin/common'

import {
  getRangeInputCellClicked,
} from '../helper/index.js'

import {
  prepareSetLower,
  prepareSetUpper,
} from '../action/index.js'

import {
  BoundaryStore,
  BOUNDARY_LOWER,
  BOUNDARY_UPPER,
} from '../types.js'

export const prepareTouch = function (parameters) {
  const {
    boundaries,
    dispatch,
    click = noop,
    doubleClick = noop,
  }: {
    boundaries: BoundaryStore;
    click: (e: Event) => void;
    doubleClick: (e: Event) => void;
  } = parameters

  let boundaryData,
    setMode: string,
    tapDetails: TapBuffer = {}

  boundaries.subscribe(currentValue => boundaryData = currentValue)

  const setLower = prepareSetLower(boundaries, dispatch),
    setUpper = prepareSetUpper(boundaries, dispatch)

  const start = (event: TouchEvent) => {
  // console.log('htSTART', event.target.tagName, event.target.dataset)
    const target = event.target as HTMLElement

    tapDetails = {
      timer: new Date().getTime(),
      originalTarget: target,
      lastTouchedClientX: null,
      lastTouchedClientY: null,
      lastTouchedTarget: null
    }

    setMode = null

// console.log(boundaryData[BOUNDARY_LOWER], boundaryData[BOUNDARY_UPPER], tapDetails.originalTarget.dataset.index)

    if (boundaryData[BOUNDARY_LOWER] == tapDetails.originalTarget.dataset.index) {
      setMode = (boundaryData[BOUNDARY_LOWER] == boundaryData[BOUNDARY_UPPER])
        ? 'both'
        : BOUNDARY_LOWER
    } else if (boundaryData[BOUNDARY_UPPER] == tapDetails.originalTarget.dataset.index) {
      setMode = BOUNDARY_UPPER
    }
    event.preventDefault(); //keeps click event from being fired when taping on it
  // console.log('setMode', setMode)
  }

  const end = (event: TouchEvent) => {
  // console.log('hte', event.target.tagName, event.target.dataset)
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
    if (tapLength < 500
      && (!tapDetails.lastTouchedTarget
        || tapDetails.originalTarget === tapDetails.lastTouchedTarget)) {
    // console.log('triggered click')
      click({target: tapDetails.originalTarget})
    }
    setMode = null
    event.preventDefault(); //keeps click event from being fired when taping on it
  }

  const move = (event: TouchEvent) => {
  // console.log('htm', event.target.tagName, event.target.dataset)
    tapDetails.lastTouchedClientX = event.changedTouches[0].clientX;
    tapDetails.lastTouchedClientY = event.changedTouches[0].clientY;
    tapDetails.lastTouchedTarget = (tapDetails.lastTouchedClientX) 
      ? document.elementFromPoint(tapDetails.lastTouchedClientX, tapDetails.lastTouchedClientY) as HTMLElement
      : tapDetails.lastTouchedTarget;
      //TODO: ? stop propagation if touchmove was registered?
    if (tapDetails.lastTouchedTarget
      && tapDetails.lastTouchedTarget.dataset
      && tapDetails.lastTouchedTarget.dataset.index
      && boundaryData[setMode] != tapDetails.lastTouchedTarget.dataset.index) {
        switch (setMode) {
          case 'both':
    // console.log('htm both ')
            setLower({target: tapDetails.lastTouchedTarget})
          case BOUNDARY_UPPER:
    // console.log('htm upper ')
            setUpper({target: tapDetails.lastTouchedTarget})
            event.stopPropagation()
            break;
          case BOUNDARY_LOWER:
    // console.log('htm lower')
            setLower({target: tapDetails.lastTouchedTarget})
            event.stopPropagation()
            break;
        }
    }
  }

  return {
    start,
    end,
    move,
  }
}