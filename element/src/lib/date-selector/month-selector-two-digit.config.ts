
import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

export const monthSelectorTwoDigitGenerator = (size?: AllowedSize) : InputPartDropdown => {
  return {
    areHelpersVisible: false,
    displayMode: 'label',
    placeholder: '01',
    size,
    type: COMPONENT_DROPDOWN_SEARCH,
    values: [
      {id: '1', value: '01'},
      {id: '2', value: '02'},
      {id: '3', value: '03'},
      {id: '4', value: '04'},
      {id: '5', value: '05'},
      {id: '6', value: '06'},
      {id: '7', value: '07'},
      {id: '8', value: '08'},
      {id: '9', value: '09'},
      {id: '10', value: '10'},
      {id: '11', value: '11'},
      {id: '12', value: '12'},
    ],
    visibleWidth: '2ch',
  }
}