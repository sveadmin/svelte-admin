import {
  createFieldValidator,
} from '@sveadmin/common'

import {
  DISPLAY_MODE_VALUE,
} from '$lib/types.js'

import {
  getDisplayValueLabelOnly,
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

export const titleConfig : InputPartDropdown = {
  autoCompleteOnSingleSuggestion: true,
  displayMode: DISPLAY_MODE_VALUE,
  getDisplayValue: getDisplayValueLabelOnly,
  isEmptyAllowed: false,
  isCurrentValueVisible: false,
  placeholder: 'Title',
  validators: createFieldValidator([]),
  values: [
    {label: 'Dr.', value: 'Dr.'},
    {label: 'Mr.', value: 'Mr.'},
    {label: 'Mrs.', value: 'Mrs.'},
    {label: 'Ms.', value: 'Ms.'},
  ],
  visibleWidth: '2rem',
  type: COMPONENT_DROPDOWN_SEARCH,
}