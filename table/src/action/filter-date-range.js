import { noop } from 'svelte/internal'

import { ModalDateRange } from '../../block'

import { getFilter } from './'

import {
  prepareGetCurrentDateRange,
  prepareGetFilterDateRange,
} from '../handler'

export const getFilterDateRange = function ({
  callback,
  contextKey,
  field,
  finalCallback = noop,
  parameters = {}
}) {
  if (!callback) {
    callback = prepareGetFilterDateRange(contextKey, field, finalCallback)
  }
  if (!parameters.getSelection) {
    parameters.getSelection = prepareGetCurrentDateRange(contextKey, field)
  }
  return getFilter({
    callback,
    component: ModalDateRange,
    field,
    parameters,
  })
}