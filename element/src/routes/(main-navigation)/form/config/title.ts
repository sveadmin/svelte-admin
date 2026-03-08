import {
  createFieldValidator,
} from '@sveadmin/common'

import {
  getDisplayValueLabelOnly,
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  SveaComponentDropdown,
} from '$lib/dropdown-search/index.js'

export const titleConfig : SveaComponentDropdown = {
  input: {
    config: {
      autoCompleteOnSingleSuggestion: true,
      clearValueOnInit: true,
      data: {
        testid: 'title',
      },
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
    }
  },
  type: COMPONENT_DROPDOWN_SEARCH,
}