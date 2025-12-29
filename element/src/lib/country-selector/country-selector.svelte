<script lang="ts">
  import {
    DISPLAY_MODE_LABEL,
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

  import {
    prepareGetCountryOption,
    sortByLabel,
  } from './helper/index.js'

  import type {
    CountrySelectorProps,
  } from './types.js'

  let {
    countryOptions,
    displayMode = DISPLAY_MODE_LABEL,
    getDisplayValue,
    isEmptyAllowed = $bindable(true),
    renderSuggestion = renderSuggestionCountry,
    suggestionsLength = $bindable(10),
    topOptions,
    value = $bindable(''),
    ...passthrough
  } : CountrySelectorProps = $props()

  const countryData = createOptionStore(defaultCountryOptions)
  const getCountryOption = prepareGetCountryOption(countryData)

  if (!countryOptions) {
    countryOptions = defaultCountryOptions
  }
  if (!Array.isArray(countryOptions)) {
    countryOptions = countryOptions.options
  }
  const optionStore = createOptionStore(
    [],
    suggestionsLength,
    isEmptyAllowed,
    undefined,
    getDisplayValue || getDisplayValueLabelOnly
  )
  if (topOptions) {
    topOptions.map(key => optionStore.add(getCountryOption(key)))
  }
  countryOptions.sort(sortByLabel)
  countryOptions.map(option => optionStore.add(getCountryOption(optionStore.getKey(option))))
</script>

<DropdownSearch {displayMode} 
  inputComponent={FlagInput}
  isSuggestionListPinnable={true}
  {renderSuggestion}
  bind:value={value}
  values={optionStore}
  {...passthrough} />
