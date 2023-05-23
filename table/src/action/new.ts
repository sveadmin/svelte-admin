import {
  getContext
} from 'svelte'


import {
  Action,
  NewActionParameters,
  SCREEN_TYPE_MODAL,
  TableContext,
} from '../types.js'

export const getNewAction = function (parameters: NewActionParameters) : Action {
  const {
    callback,
    component,
    contextKey,
  } = parameters

  const {
    screens
  } = getContext(contextKey) as TableContext

  return {
    label: 'New',
    callback: async () => {
      screens.displayTop(SCREEN_TYPE_MODAL, component)
      return true
      // modal.set({
      //   component,
      //   parameters,
      //   listeners: {
      //     submit: callback
      //   }
      // })
    }
  }
}