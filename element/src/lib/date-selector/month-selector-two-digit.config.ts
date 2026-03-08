import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
  getDisplayValueValueOnly,
} from '$lib/dropdown-search/index.js'

import type {
  SveaComponentDropdown,
} from '$lib/dropdown-search/index.js'

import { renderSuggestionMonth } from './render-suggestion-month.svelte'

import { keyMap } from './numeric-date-field-key-map.js'

export const monthSelectorTwoDigitGenerator = (
  size?: AllowedSize,
  allowedKeys: string[] = ['/[0-9]/'],
) : SveaComponentDropdown => {
  const inputKeyMap = {
    ...keyMap,
  }

  return {
    input: {
      config: {
        allowedKeys,
        autoCompleteOnSingleSuggestion: true,
        childrenConfig: {
          1: {
            style: [
              'width: 8em'
            ]
          }
        },
        getDisplayValue: getDisplayValueValueOnly,
        isCurrentValueVisible: false,
        isSuggestionListVisible: true,
        keyMap: inputKeyMap,
        placeholder: '01',
        renderSuggestion: renderSuggestionMonth,
        size,
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
    },
    type: COMPONENT_DROPDOWN_SEARCH,
  }
}