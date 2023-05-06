import { noop } from 'svelte/internal'

import { ModalInputText } from '../../block'

import { getFilter } from './'

import {
  prepareGetCurrentFloatingInput,
  prepareGetFilterFloatingInput,
} from '../handler'

export const getFilterFloatingInput = function ({
  callback,
  contextKey,
  field,
  finalCallback = noop,
  parameters = {}
}) {
  if (!callback) {
    callback = prepareGetFilterFloatingInput(contextKey, field, finalCallback)
  }
  if (!parameters.getSelection) {
    parameters.getSelection = prepareGetCurrentFloatingInput(contextKey, field)
  }
  return getFilter({
    callback,
    component: ModalInputText,
    field,
    parameters,
  })
}