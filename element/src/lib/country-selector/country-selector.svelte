<script lang="ts">
  import {
    i18n,
  } from '@sveadmin/common'

  import {
    DISPLAY_MODE_LABEL,
  } from '$lib/types.js'

  import type {
    Option,
    OptionIndexed,
  } from '$lib/types.js'

  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import {
    createOptionStore,
  } from '$lib/helper/index.js'

  import {
    renderSuggestionCountry,
  } from './render-suggestion-country.svelte'


  import {
    countryOptions as defaultCountryOptions,
  } from './config/index.js'

  import {
    COMPONENT_COUNTRY_SELECTOR,
  } from './types.js'
  
  import type {
    CountrySelectorProps,
  } from './types.js'

  let {
    countryOptions,
    displayMode = DISPLAY_MODE_LABEL,
    renderSuggestion = renderSuggestionCountry,
    topOptions,
    ...passthrough
  } : CountrySelectorProps = $props()

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
</script>

<DropdownSearch {displayMode} 
  {renderSuggestion}
  values={optionStore}
  {...passthrough} />
