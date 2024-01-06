import {
  getContext
} from 'svelte'

import {
  screen,
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

  // parameters.setFocus = true
  return {
    label: 'filter',
    activeMetaField: `${field}FilterIsActive`,
    callback: async () => {
      screen.setComponent(component, SCREEN_TYPE_MODAL)
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