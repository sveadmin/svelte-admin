import {
  getContext
} from 'svelte'

import {
  SCREEN_TYPE_MODAL,
} from '@sveadmin/common'

import {
  Action,
  FilterActionParameters,
  TableContext,
} from '../types.js'

export const getFilter = function (parameters: FilterActionParameters) : Action {
  const {
    callback,
    component,
    contextKey,
    field
  } = parameters

  const {
    screens
  } = getContext(contextKey) as TableContext
  // parameters.setFocus = true
  return {
    label: 'filter',
    activeMetaField: `${field}FilterIsActive`,
    callback: async () => {
      screens.displayTop(SCREEN_TYPE_MODAL, component)
      // modal.set({
      //   component,
      //   parameters,
      //   listeners: {
      //     submit: callback
      //   }
      // })
      return true
    }
  }
}