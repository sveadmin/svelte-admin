import {
  createFieldValidator,
} from '@sveadmin/common'

import {
  getDisplayValueLabelOnly,
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  ComponentDropdown,
} from '$lib/dropdown-search/index.js'

export const titleConfig : ComponentDropdown = {
  input: {
    config: {
      data: {
        testid: 'title',
      },
      getDisplayValue: getDisplayValueLabelOnly,
      isEmptyAllowed: false,
      isCurrentValueVisible: false,
      isValueClearedOnInit: true,
      isValueSetAutomaticallyOnSingleSuggestion: true,
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