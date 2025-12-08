import {
  i18n,
} from '@sveadmin/common'

import {
  DISPLAY_MODE_LABEL,
} from '$lib/types.js'

import type {
  Option,
  OptionIndexed,
  OptionStore,
} from '$lib/types.js'

import {
  createOptionStore,
} from '$lib/helper/index.js'

import {
  COMPONENT_DROPDOWN_SEARCH
} from '$lib/dropdown-search/types.js'

import type {
  InputPartDropdown,
} from '$lib/dropdown-search/types.js'

import {
  renderSuggestionCountry,
} from '../render-suggestion-country.svelte'


import {
  countryOptions as defaultCountryOptions,
} from './country-options.js'

export function countryConfigGenerator(countryOptions?: Option[] | OptionStore, topOptions?: string[] ) : InputPartDropdown {
  const countryData = createOptionStore(defaultCountryOptions)
  const countryMap = (optionValue: string) => {
      const currentCountry : OptionIndexed | undefined = countryData.optionsByValue.get(optionValue)
      optionStore.add({
        label: (currentCountry?.label) ? i18n.t(currentCountry?.label) : optionValue,
        properties: currentCountry?.properties,
        value: optionValue,
      })
  }

  if (!countryOptions) {
    countryOptions = defaultCountryOptions
  }
  if (!Array.isArray(countryOptions)) {
    countryOptions = countryOptions.options
  }
  const optionStore = createOptionStore([])
  if (topOptions) {
    topOptions.map(countryMap)
  }
  countryOptions.sort((a: Option, b: Option) => {
    const labelA = a.label.toUpperCase()
    const labelB = b.label.toUpperCase()
    if (labelA < labelB) {
      return -1
    }
    if (labelA > labelB) {
      return 1
    }
    return 0
  })
  countryOptions.map(option => countryMap(option.value))

  return {
    displayMode: DISPLAY_MODE_LABEL,
    placeholder: 'Country',
    renderSuggestion: renderSuggestionCountry,
    type: COMPONENT_DROPDOWN_SEARCH,
    values: optionStore
  }
}