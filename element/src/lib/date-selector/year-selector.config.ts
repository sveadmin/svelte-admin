import type {
  AllowedSize,
  Option,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
  getDisplayValueValueOnly,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

import { keyMap } from './numeric-date-field-key-map.js'

export const yearGenerator = (
  size?: AllowedSize,
  allowedKeys: string[] = ['/[0-9]/'],
  deltaFrom: number = 0,
  deltaTo: number = 10
) : InputPartDropdown => {
  const inputKeyMap = {
    ...keyMap,
  }

  const year = new Date().getUTCFullYear()
  const values: Option[] = []
  for (let i = year - deltaFrom; i <= year + deltaTo; i += 1) {
    let iString = i.toString()
    values.push({
      label: iString.slice(2),
      value: iString,
    })
  }

  return {
    allowedKeys,
    autoCompleteOnSingleSuggestion: true,
    isCurrentValueVisible: false,
    keyMap: inputKeyMap,
    placeholder: year.toString(),
    getDisplayValue: getDisplayValueValueOnly,
    size,
    type: COMPONENT_DROPDOWN_SEARCH,
    values,
    visibleWidth: '3.75ch',
  }
}