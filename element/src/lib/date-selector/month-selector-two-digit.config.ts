import {
  DISPLAY_MODE_VALUE,
} from '$lib/types.js'

import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
} from '$lib/dropdown-search/index.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/index.js'

import { renderSuggestionMonth } from './render-suggestion-month.svelte'

import { keyMap } from './numeric-date-field-key-map.js'

export const monthSelectorTwoDigitGenerator = (
  size?: AllowedSize,
  allowedKeys: string[] = ['/[0-9]/'],
) : InputPartDropdown => {
  const inputKeyMap = {
    ...keyMap,
  }

  return {
    allowedKeys,
    autoCompleteOnSingleSuggestion: true,
    displayMode: DISPLAY_MODE_VALUE,
    isCurrentValueVisible: false,
    isSuggestionListVisible: true,
    keyMap: inputKeyMap,
    placeholder: '01',
    renderSuggestion: renderSuggestionMonth,
    size,
    type: COMPONENT_DROPDOWN_SEARCH,
    values: [
      {value: '01', label: '1'},
      {value: '02', label: '2'},
      {value: '03', label: '3'},
      {value: '04', label: '4'},
      {value: '05', label: '5'},
      {value: '06', label: '6'},
      {value: '07', label: '7'},
      {value: '08', label: '8'},
      {value: '09', label: '9'},
      {value: '10', label: '10'},
      {value: '11', label: '11'},
      {value: '12', label: '12'},
    ],
    visibleWidth: '2ch',
  }
}