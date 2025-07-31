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
      {id: '01', value: '1'},
      {id: '02', value: '2'},
      {id: '03', value: '3'},
      {id: '04', value: '4'},
      {id: '05', value: '5'},
      {id: '06', value: '6'},
      {id: '07', value: '7'},
      {id: '08', value: '8'},
      {id: '09', value: '9'},
      {id: '10', value: '10'},
      {id: '11', value: '11'},
      {id: '12', value: '12'},
    ],
    visibleWidth: '2ch',
  }
}