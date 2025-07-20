import type {
  AllowedSize,
  Option,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

export const yearGenerator = (size?: AllowedSize) : InputPartDropdown => {
  const year = new Date().getUTCFullYear()
  const values: Option[] = []
  for (let i = year; i <= year + 10; i += 1) {
    let iString = i.toString()
    values.push({
      id: iString,
      value: iString
    })
    values.push({
      id: iString.slice(2),
      value: iString
    })
  }

  return {
    areHelpersVisible: false,
    displayMode: 'label',
    placeholder: '2025',
    size,
    type: COMPONENT_DROPDOWN_SEARCH,
    values,
    visibleWidth: '3.75ch',
  }
}