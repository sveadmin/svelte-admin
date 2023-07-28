<script lang="ts">
  import {
    createEventDispatcher,
    getContext,
  } from 'svelte'

  import {
    writable,
    Writable,
  } from 'svelte/store'

  import {
    getWindowScroll,
  } from '@sveadmin/common'

  import {
    ActionMatrix,
    ActionMatrixDescriptor,
    SettingsList,
    TableContext,
    TableContextKey,
  } from './types.js'

  import {
    matrixMap,
  } from './helper/index.js'

  export let buttonHeight: number = 40,
    buttonWidth: number = 40,
    contextKey: TableContextKey = {},
    columnSettings: SettingsList,
    paddingHeight: number = 14,
    paddingWidth: number = 14,
    visionBoundaryRefStore: Writable<HTMLElement | null>

  let metaProperties = [],
    metaValues = {},
    preventScroll: boolean = false

/**
 * action = {
 *  callback: () => {},
 *  label: 'used for display icone',
 *  metaField: 'property' // retrieved from $meta[columnId + '-' + property]
 * }
 */
  const {
    base = 4,
    displayName,
    field,
    grow = 0,
    id,
    max = 50,
    readOnly = false,
    shrink = 0,
    titleAction,
  } = columnSettings as SettingsList

  // if (actions) {
  //   metaProperties = actions.reduce(
  //     (aggregator, action) => {
  //       if (action.metaField) {
  //         aggregator.push(action.metaField)
  //       }
  //       if (action.activeMetaField) {
  //         aggregator.push(action.activeMetaField)
  //       }
  //       return aggregator
  //     },
  //     []
  //   )
  // }


/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  const context = getContext(contextKey) as TableContext

  const {
    actions,
    meta,
    sort,
  } = context

const testButtons = {
  0: {
    [-1]: {icon: 'sort-up', label: '1', callback: () => true},
    1: {icon: 'sort-down', label: '2', callback: () => true},
  },
  [-1]: {
    0: {icon: 'filter', label: '3', callback: () => true},
    [-1]: {icon: 'remove-selection', label: '5', callback: () => true},
    // 1: {label: '7', callback: () => true},
  },
  1: {
    0: {icon: 'add-selection', label: '4', callback: () => true},
    // [-1]: {label: '6', callback: () => true},
    // 1: {label: '8', callback: () => true},
  },
}

  let actionMatrix: ActionMatrix,
    buttons: ActionMatrix = testButtons,
    delayAction: number = 0,
    instance: HTMLElement = null,
    maxX: number = 0,
    maxY: number = 0,
    minX: number = 0,
    minY: number = 0,
    touchX: number,
    touchY: number,
    validPositions: {
      [key: number] : {
        [key: number] : boolean
      }
    } = {}

  meta.subscribe(currentValue => {
    metaProperties.map(property => {
      metaValues[property] = currentValue[property]
    })
  })

  context.actions.subscribe(currentValue => {
    if (!currentValue.visibleColumnActions) {
      preventScroll = false
    }
  })

  const setMinMaxColumn = (columnIndex: number) : void => {
    if (columnIndex < 0 && columnIndex < minX) {
      minX = columnIndex
    }
    if (columnIndex > 0 && columnIndex > maxX) {
      maxX = columnIndex
    }
  }

  const setMinMaxRow = (rowIndex: number) : void => {
    if (rowIndex < 0 && rowIndex < minY) {
      minY = rowIndex
    }
    if (rowIndex > 0 && rowIndex > maxY) {
      maxY = rowIndex
    }
  }

  const checkPositions = (x: number, y: number) : void => {
    validPositions = {}
    matrixMap.map((currentMatrixPosition: ActionMatrixDescriptor) => {
      const horizontalBoundary = x + currentMatrixPosition.x * paddingWidth
          + currentMatrixPosition.x * buttonWidth
          - .5 * paddingWidth
          - .5 * buttonWidth
      const verticalBoundary = y + currentMatrixPosition.y * paddingHeight
          + currentMatrixPosition.y * buttonHeight
          - .5 * paddingHeight
          - .5 * buttonHeight

      if (!validPositions[currentMatrixPosition.x]) {
        validPositions[currentMatrixPosition.x] = {}
      }
      validPositions[currentMatrixPosition.x][currentMatrixPosition.y] = (
          (currentMatrixPosition.x <= 0
            && horizontalBoundary < 0)
          || (currentMatrixPosition.x >= 0
            && horizontalBoundary > $visionBoundaryRefStore.offsetWidth - .5 * buttonWidth)
          || (currentMatrixPosition.y <= 0 
            && verticalBoundary < -10) // Some overlap on the action abr is acceptable
          || (currentMatrixPosition.y >= 0
            && verticalBoundary > $visionBoundaryRefStore.offsetHeight - buttonHeight)
        ) ? false
        : true
    })
  }

  const showActions = (x: number, y: number) : void => {
    const scroll = getWindowScroll($visionBoundaryRefStore)
    x = x - $visionBoundaryRefStore.offsetLeft + scroll.scrollX
    y = y - $visionBoundaryRefStore.offsetTop + scroll.scrollY
    checkPositions(x, y)
    actionMatrix = {}
    maxX = 0
    maxY = 0
    minX = 0
    minY = 0
    Object.keys(buttons).map((columnKey: string) => {
      const columnIndex = parseInt(columnKey)
      if (!actionMatrix[columnIndex]) {
        actionMatrix[columnIndex] = {}
      }
      Object.keys(buttons[columnKey]).map((rowKey: string) => {
        const rowIndex = parseInt(rowKey)
        if (validPositions
          && validPositions[columnIndex]
          && validPositions[columnIndex][rowIndex]) {
          actionMatrix[columnIndex][rowIndex] = buttons[columnIndex][rowIndex]
          setMinMaxColumn(columnIndex)
          setMinMaxRow(rowIndex)
        } else {
          let found = false, i = 0
          while (!found) {
            const currentPlace = matrixMap[i]
            if ((!actionMatrix[currentPlace.x]
              || !actionMatrix[currentPlace.x][currentPlace.y])
              && (!buttons[currentPlace.x]
                || !buttons[currentPlace.x][currentPlace.y])) {
              if (validPositions
                && validPositions[currentPlace.x]
                && validPositions[currentPlace.x][currentPlace.y]) {
                if (!actionMatrix[currentPlace.x]) {
                  actionMatrix[currentPlace.x] = {}
                }
                actionMatrix[currentPlace.x][currentPlace.y] = buttons[columnIndex][rowIndex]
                setMinMaxColumn(currentPlace.x)
                setMinMaxRow(currentPlace.y)
                found = true
              }
            }
            if (++i >= matrixMap.length) {
              found = true
            }
          }
        }
      })
    })

    if (Object.keys(actionMatrix).length === 0) {
      actions.hideColumnActions()
    }



    const overlayX = x 
      + minX * paddingWidth
      + minX * buttonWidth 
      - .5 * paddingWidth 
      - .5 * buttonWidth 
    const overlayY = y 
      + minY * paddingHeight
      + minY * buttonHeight 
      - .5 * paddingHeight 
      - .5 * buttonHeight 

    actions.showColumnActions(
      actionMatrix,
      overlayX,
      overlayY
    )
  }

  const handleClick = (event: Event) : void => {
    if (event instanceof KeyboardEvent) {
      if (event.key !== 'Enter') {
        return
      }
    }

    const {
      clientX,
      clientY
    } = event as MouseEvent

    showActions(clientX, clientY)
  }

  const handleTouch = () : void => {
    preventScroll = true
    showActions(touchX, touchY)
  }

  const handleTouchMove = (event: TouchEvent) : boolean => {
    let touchedElement = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY) as HTMLElement
    while (touchedElement &&
      touchedElement.tagName !== 'SVEACOLUMNHEADER') {
      touchedElement = touchedElement.parentNode as HTMLElement
    }
    if (preventScroll) {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
    if (instance !== touchedElement) {
      window.clearTimeout(delayAction)
      preventScroll = false
    }
    // console.log('htm', instance === touchedElement, event)
  }

  const handleTouchStart = (event: TouchEvent) : void => {
    touchX = event.changedTouches[0].clientX
    touchY = event.changedTouches[0].clientY
    delayAction = window.setTimeout(handleTouch, 500)
    // console.log('hts', event)
  }

  const handleTouchEnd = (event: TouchEvent) : void => {
    window.clearTimeout(delayAction)
    let touchedElement = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY) as HTMLElement
    if (touchedElement.tagName === 'SVEACLOSEACTIONS') {
      actions.hideColumnActions()
      event.preventDefault()
      event.stopPropagation()
    }
    while (touchedElement &&
      touchedElement.tagName !== 'SVEACOLUMNACTIONS') {
      touchedElement = touchedElement.parentNode as HTMLElement
    }
    if (!touchedElement) {
      actions.hideColumnActions()
      event.preventDefault()
      event.stopPropagation()
    }
    // console.log('hte', touchedElement)
  }

  const dispatch = createEventDispatcher();

</script>

<sveacolumnheader
  style="flex:{grow} {shrink} {base}rem;max-width:{max}rem;"
  bind:this={instance}
  class:editable={!readOnly || actions.getEditor(field)}
  class:noscroll={preventScroll}
  class:buttons={Object.values(buttons).length > 0}
  on:click={handleClick}
  on:keyup={handleClick}
  on:touchmove={handleTouchMove}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  >
  <sveacolumntitle
    data-sort="{$sort[id] && $sort[id]}"
    class:actionable={titleAction}
  >
    {displayName || field}
  </sveacolumntitle>
</sveacolumnheader>

<style global src="./column-header.css"></style>