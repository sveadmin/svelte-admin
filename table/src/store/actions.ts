import {
  get,
  writable,
  Writable,
} from 'svelte/store'

import {
  Action,
  ActionData,
  EditorActionParameters,
  ActionStore,
  ActionStoreConstructor,
  ActionQuarter,
  ALLOWED_ACTION_QUARTERS,
  ACTION_QUARTER_BOTTOM,
  ACTION_QUARTER_LEFT,
  ACTION_QUARTER_RIGHT,
  ACTION_QUARTER_TOP,
  ActionMatrixDescriptor,
  ActionMatrix,
} from '../types.js'

import {
  matrixMap,
  matrixMapBottom,
  matrixMapLeft,
  matrixMapRight,
  matrixMapTop,
} from '../helper/index.js'

export const getActions = function (parameters: ActionStoreConstructor = {}) : ActionStore {
  const {
    generic = [],
    row = [],
    column = {}
  } = parameters

  const store: Writable<ActionData> = writable({
    generic,
    row,
    column
  })

  const {subscribe, set, update} = store

  const addColumnButton = (
    action: Action,
    column: string,
    quarter: ActionQuarter
  ) : void => {

    update(currentValue => {
      if (!currentValue.column[column]) {
        currentValue.column[column] = {}
      }
      if (!currentValue.column[column].buttons) {
        currentValue.column[column].buttons = {}
      }
      const buttons = currentValue.column[column].buttons
      let map = matrixMap
      switch (quarter) {
        case ACTION_QUARTER_BOTTOM:
          map = matrixMapBottom
          break
        case ACTION_QUARTER_LEFT:
          map = matrixMapLeft
          break
        case ACTION_QUARTER_RIGHT:
          map = matrixMapRight
          break
        case ACTION_QUARTER_TOP:
          map = matrixMapTop
          break
      }

      const nextAvailable = map.find((currentMap: ActionMatrixDescriptor) => {
        return !buttons[currentMap.x]
          || !buttons[currentMap.x][currentMap.y]
      })

      buttons[nextAvailable.x][nextAvailable.y] = action
      return currentValue
    })
  }

  const addGeneric = (action: Action) : void => {
    update(currentValue => {
      currentValue.generic.push(action)
      return currentValue
    })
  }

  const addRow = (action: Action) : void => {
    update(currentValue => {
      currentValue.generic.push(action)
      return currentValue
    })
  }

  const getEditor = (column: string) : EditorActionParameters | null => {
    const data: ActionData = get(store)
    return data.column[column]
      && data.column[column].editor
      || null
  }

  const hideColumnActions = () : void => {
    update(currentValue => {
      currentValue.visibleColumnActions = null
      return currentValue
    })
  }

  const setEditor = (column: string, editor: EditorActionParameters) : void => {
    update(currentValue => {
      if (!currentValue.column[column]) {
        currentValue.column[column] = {}
      }
      currentValue.column[column].editor = editor
      return currentValue
    })
  }

  const showColumnActions = (
    buttons: ActionMatrix,
    x: number,
    y: number,
  ) : void => {
    update(currentValue => {
      currentValue.visibleColumnActions = {
        buttons,
        x,
        y,
      }
      return currentValue
    })
  }

  return {
    addColumnButton,
    addGeneric,
    addRow,
    getEditor,
    hideColumnActions,
    set,
    setEditor,
    showColumnActions,
    subscribe,
    update,
  }
}