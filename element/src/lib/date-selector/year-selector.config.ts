import {
  DISPLAY_MODE_VALUE,
} from '$lib/types.js'

import type {
  AllowedSize,
  Option,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
  getDisplayValueLabelOnly,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

import { keyMap } from './numeric-date-field-key-map.js'

export const yearGenerator = (
  size?: AllowedSize,
  allowedKeys: string[] = ['/[0-9]/'],
) : InputPartDropdown => {
  const inputKeyMap = {
    ...keyMap,
  }

  const year = new Date().getUTCFullYear()
  const values: Option[] = []
  for (let i = year; i <= year + 10; i += 1) {
    let iString = i.toString()
    values.push({
      label: iString.slice(2),
      value: iString,
    })
  }

  return {
    allowedKeys,
    autoCompleteOnSingleSuggestion: true,
    displayMode: DISPLAY_MODE_VALUE,
    isCurrentValueVisible: false,
    keyMap: inputKeyMap,
    placeholder: year.toString(),
    getDisplayValue: getDisplayValueLabelOnly,
    size,
    type: COMPONENT_DROPDOWN_SEARCH,
    values,
    visibleWidth: '3.75ch',
  }
}