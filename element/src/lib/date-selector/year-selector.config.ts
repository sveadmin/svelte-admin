import type {
  Option,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
  getDisplayValueValueOnly,
} from '$lib/dropdown-search/index.js'

import type {
  ComponentDropdown,
  DropdownSearchInputProps,
} from '$lib/dropdown-search/index.js'

import { keyMap } from './numeric-date-field-key-map.js'

export const yearGenerator = (
  options: DropdownSearchInputProps = {},
  deltaFrom: number = 0,
  deltaTo: number = 10
) : ComponentDropdown => {
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
    input: {
      config: {
        allowedKeys: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        isCurrentValueVisible: false,
        isInlineClearButtonVisible: false,
        isValueSetAutomaticallyOnSingleSuggestion: true,
        keyMap: inputKeyMap,
        placeholder: year.toString(),
        getDisplayValue: getDisplayValueValueOnly,
        values,
        visibleWidth: '3.75ch',
        ...options
      }
    },
    type: COMPONENT_DROPDOWN_SEARCH,
  }
}