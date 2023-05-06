import { writable as internal, get as internalGet } from 'svelte/store'
import { modal } from '../../../../store/modal'
import Empty from '../../../shared/empty.svelte'

export function writable() {
  const store = internal({})
  const optionStore = internal({})
  const conditionStore = internal({})
  const {subscribe, set, update} = store

  const getEditor = (editor, table) => {
    const {
      type = 'input-text',
      target = 'cell',
      parameters  = {},
      component = Empty,
      callback = () => {}
    } = editor
    switch (target) {
      case 'cell':
        return async ({row, columnIndex}) => {
          table.changeComponent(type, row.attributes, columnIndex)
        }
      case 'modal':
        return async ({row, columnIndex}) => {
          modal.set({
            component,
            parameters: {row, columnIndex, ...parameters},
            listeners: {
              submit: event => {
                callback(event)
              }
            }
          })
        }
    }
  }

  const add = (key, editor, table) => {
    update(currentValue => {currentValue[key] = getEditor(editor, table); return currentValue})
    if (editor.options) {
      optionStore.update(currentValue => {currentValue[key] = editor.options; return currentValue})
    }
    if (editor.condition) {
      conditionStore.update(currentValue => {currentValue[key] = editor.condition; return currentValue})
    }
  }

  const has = key => {
    const data = internalGet(store)
    return !!data[key]
  }

  const get = key => {
    const data = internalGet(store)
    return data[key]
  }

  const getOptions = key => {
    const data = internalGet(optionStore)
    return data[key] ?? {}
  }

  const checkCondition = (key, rowAttributes, originalAttributes) => {
    const data = internalGet(conditionStore)
    if (!data[key]) {
      return true
    }
    return data[key](rowAttributes, originalAttributes)
  }

  return {
    add,
    checkCondition,
    get,
    getOptions,
    has,
    set,
    subscribe
  }
}

export const getEditors = function () {
  return writable()
}