import { getContext } from 'svelte'
import { noop } from 'svelte/internal'

import { getFilter } from './index.js'

import {
  prepareGetCurrentDropdownMulti,
  prepareGetFilterDropdownMulti,
} from '../handler/index.js'

import {
  Action,
  FilterDropdownMultiParameters,
  TableContext,
} from '../types.js'

export const getFilterDropdownMulti = function (parameters: FilterDropdownMultiParameters) : Action {
  const {
    contextKey,
    field,
    finalCallback = noop,
    values,
  } = parameters

  const {
    callback = prepareGetFilterDropdownMulti(contextKey, field, finalCallback),
    getSelection = prepareGetCurrentDropdownMulti(contextKey, field),
    getValues = (!values)
      ? () => settings.getColumn(field).values
      : null
  } = parameters

  const {
    settings
  } = getContext(contextKey) as TableContext
  
  return getFilter({
    callback,
    component: null,
    contextKey,
    field,
  })
}