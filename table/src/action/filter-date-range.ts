import { noop } from 'svelte/internal'

import { getFilter } from './index.js'

import {
  prepareGetCurrentDateRange,
  prepareGetFilterDateRange,
} from '../handler/index.js'

import {
  Action,
  FilterDateRangeParameters,
} from '../types.js'

export const getFilterDateRange = function (parameters: FilterDateRangeParameters) : Action {
  const {
    contextKey,
    field,
    finalCallback = noop,
  } = parameters

  const {
    callback = prepareGetFilterDateRange(contextKey, field, finalCallback),
    getSelection = prepareGetCurrentDateRange(contextKey, field)
  } = parameters

  return getFilter({
    callback,
    component: null,
    contextKey,
    field,
    // getSelection, // Try to solve it with the component inject
  })
}