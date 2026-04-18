import {
  createFieldValidator,
} from '@sveadmin/common'

import {
  getDisplayValueLabelOnly,
} from '$lib/dropdown-search/index.js'

import type {
  DropdownSearchInputProps,
} from '$lib/dropdown-search/index.js'

export const titleConfig : DropdownSearchInputProps = {
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