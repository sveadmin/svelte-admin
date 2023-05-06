import { getContext } from 'svelte'
import { noop } from 'svelte/internal'

import { DropdownMulti } from '../../block'

import { getFilter } from './'

import {
  prepareGetCurrentDropdownMulti,
  prepareGetFilterDropdownMulti,
} from '../handler'

export const getFilterDropdownMulti = function ({
  callback,
  contextKey,
  field,
  finalCallback = noop,
  parameters = {}
}) {
  const { settings } = getContext(contextKey)
  
  if (!callback) {
    callback = prepareGetFilterDropdownMulti(contextKey, field, finalCallback)
  }
  if (!parameters.values) {
    parameters.values = () => settings.getColumn(field).values
  }
  if (!parameters.getSelection) {
    parameters.getSelection = prepareGetCurrentDropdownMulti(contextKey, field)
  }
  return getFilter({
    callback,
    component: DropdownMulti,
    field,
    parameters,
  })
}