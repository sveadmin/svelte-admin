<script lang="ts">
  import {
    DropdownSearch,
    getDisplayValueLabelOnly,
  } from '$lib/dropdown-search/index.js'

  import {
    propertyMerger,
  } from '$lib/helper/index.js'

  import {
    createOptionStore,
  } from '$lib/option/index.js'

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
    CountrySelectorInputProps,
  } from './types.js'

  let {
    childrenConfig,
    countryOptions,
    getDisplayValue,
    inputComponent = FlagInput,
    isEmptyAllowed = $bindable(true),
    renderSuggestion = renderSuggestionCountry,
    suggestionsLength = $bindable(10),
    topOptions,
    value = $bindable(''),
    ...passthrough
  } : CountrySelectorInputProps = $props()

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
    topOptions.map(key => {
      optionStore.add(getCountryOption(key))
    })
    // topOptions.map(key => optionStore.add(getCountryOption(key)))
  }
  countryOptions.sort(sortByLabel)
  countryOptions.map(option => optionStore.add(
    getCountryOption(
      optionStore.getKey(option)
    )
  ))

  const dropdownConfig = propertyMerger(
    {
      inputComponent,
      renderSuggestion,
      values: optionStore,
    },
    childrenConfig?.dropdown,
    childrenConfig?.[0],
    passthrough
  )

// $inspect(optionStore)
</script>

<DropdownSearch
  bind:value={value}
  {...dropdownConfig} />

