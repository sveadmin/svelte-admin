import {
  writable,
  Writable,
} from 'svelte/store'

import {
  Action,
  ActionData,
  EditorActionParameters,
  ActionStore,
  ActionStoreConstructor,
} from '../types.js'

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

  const addColumnButton = (columnIndex: number, action: Action) : void => {
    update(currentValue => {
      if (!currentValue.column[columnIndex]) {
        currentValue.column[columnIndex] = {}
      }
      if (!currentValue.column[columnIndex].buttons) {
        currentValue.column[columnIndex].buttons = []
      }
      currentValue.column[columnIndex].buttons.push(action)
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

  const setEditor = (columnIndex: number, editor: EditorActionParameters) : void => {
    update(currentValue => {
      if (!currentValue.column[columnIndex]) {
        currentValue.column[columnIndex] = {}
      }
      currentValue.column[columnIndex].editor = editor
      return currentValue
    })
  }

  const setTitle = (columnIndex: number, action: Action) : void => {
    update(currentValue => {
      if (!currentValue.column[columnIndex]) {
        currentValue.column[columnIndex] = {}
      }
      currentValue.column[columnIndex].title = action
      return currentValue
    })
  }

  return {
    addColumnButton,
    addGeneric,
    addRow,
    set,
    setEditor,
    setTitle,
    subscribe,
    update,
  }
}