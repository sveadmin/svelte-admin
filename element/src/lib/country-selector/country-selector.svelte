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
    getDisplayValueLabelOnly,
  } from '$lib/dropdown-search/index.js'

  import {
    createOptionStore,
  } from '$lib/helper/index.js'

  import FlagInput from './flag-input.svelte'

  import {
    renderSuggestionCountry,
  } from './render-suggestion-country.svelte'

  import {
    countryOptions as defaultCountryOptions,
  } from './config/index.js'

  import type {
    CountrySelectorProps,
  } from './types.js'

  let {
    countryOptions,
    displayMode = DISPLAY_MODE_LABEL,
    getDisplayValue,
    renderSuggestion = renderSuggestionCountry,
    topOptions,
    value = $bindable(),
    ...passthrough
  } : CountrySelectorProps = $props()

  const countryData = createOptionStore(defaultCountryOptions)
  const countryMap = (optionValue: string) => {
      const currentCountry : OptionIndexed | undefined = countryData.getOption(optionValue)
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
  const optionStore = createOptionStore([], undefined, getDisplayValue || getDisplayValueLabelOnly)
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
$inspect('DD', value)
</script>

<DropdownSearch {displayMode} 
  inputComponent={FlagInput}
  isSuggestionListPinnable={true}
  {renderSuggestion}
  bind:value={value}
  values={optionStore}
  {...passthrough} />
