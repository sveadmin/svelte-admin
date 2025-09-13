import {
  createFieldValidator,
  requiredValidator,
} from '@sveadmin/common'

import {
  DISPLAY_MODE_VALUE,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

export const titleConfig : InputPartDropdown = {
  displayMode: DISPLAY_MODE_VALUE,
  autoCompleteOnSingleSuggestion: true,
  isEmptyAllowed: false,
  isCurrentValueVisible: false,
  placeholder: 'Title',
  values: [
    {label: 'Dr.', value: 'Dr.'},
    {label: 'Mr.', value: 'Mr.'},
    {label: 'Mrs.', value: 'Mrs.'},
    {label: 'Ms.', value: 'Ms.'},
  ],
  type: COMPONENT_DROPDOWN_SEARCH,
  validators: createFieldValidator([requiredValidator()]),
  visibleWidth: '2rem',
}