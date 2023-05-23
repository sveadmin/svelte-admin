import { noop } from 'svelte/internal'

import { getFilter } from './index.js'

import {
  prepareGetCurrentFloatingInput,
  prepareGetFilterFloatingInput,
} from '../handler/index.js'
import {
  Action,
  FilterFloatingInputParameters,
} from '../types.js'

export const getFilterFloatingInput = function (parameters: FilterFloatingInputParameters) : Action {
  const {
    contextKey,
    field,
    finalCallback = noop,
  } = parameters

  const {
    callback = prepareGetFilterFloatingInput(contextKey, field, finalCallback),
    getSelection = prepareGetCurrentFloatingInput(contextKey, field)
  } = parameters


  return getFilter({
    callback,
    component: null,
    contextKey,
    field,
  })
}