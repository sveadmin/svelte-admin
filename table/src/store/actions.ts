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

  const addColumnButton = (column: string, action: Action) : void => {
    update(currentValue => {
      if (!currentValue.column[column]) {
        currentValue.column[column] = {}
      }
      if (!currentValue.column[column].buttons) {
        currentValue.column[column].buttons = []
      }
      currentValue.column[column].buttons.push(action)
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

  const setEditor = (column: string, editor: EditorActionParameters) : void => {
    update(currentValue => {
      if (!currentValue.column[column]) {
        currentValue.column[column] = {}
      }
      currentValue.column[column].editor = editor
      return currentValue
    })
  }

  const setTitle = (column: string, action: Action) : void => {
    update(currentValue => {
      if (!currentValue.column[column]) {
        currentValue.column[column] = {}
      }
      currentValue.column[column].title = action
      return currentValue
    })
  }

  return {
    addColumnButton,
    addGeneric,
    addRow,
    getEditor,
    set,
    setEditor,
    setTitle,
    subscribe,
    update,
  }
}