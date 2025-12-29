<script lang="ts">
  import {
    DISPLAY_MODE_LABEL,
  } from '$lib/types.js'

  import {
    getDisplayValueDefault,
  } from '$lib/dropdown-search/index.js'

  import {
    createOptionStore,
  } from '$lib/helper/index.js'

  import {
    countryOptions,
    CountrySelector,
    sortByLabel,
  } from '$lib/country-selector/index.js'

  import {
    phonePrefixOptions as defaultPhonePrefixOptions,
  } from './config/index.js'

  import {
    optionGetPhonePrefixKey,
    prepareGetPhonePrefixOption,
  } from './helper/index.js'

  import type {
    PhonePrefixSelectorProps,
  } from './types.js'

  import PrefixFlagInput from './prefix-flag-input.svelte'

  import {
    renderSuggestionPrefix,
  } from './render-suggestion-prefix.svelte'

  let {
    phonePrefixOptions,
    displayMode = DISPLAY_MODE_LABEL,
    getDisplayValue,
    getKey = optionGetPhonePrefixKey,
    isEmptyAllowed,
    renderSuggestion = renderSuggestionPrefix,
    suggestionsLength,
    topOptions,
    value = $bindable(''),
    ...passthrough
  } : PhonePrefixSelectorProps = $props()

  const phonePrefixData = createOptionStore(
    defaultPhonePrefixOptions,
    undefined,
    undefined,
    getKey
  )
  const countryData = createOptionStore(countryOptions)
  const getPhonePrefixOption = prepareGetPhonePrefixOption(phonePrefixData, countryData)

  if (!phonePrefixOptions) {
    phonePrefixOptions = defaultPhonePrefixOptions
  }
  if (!Array.isArray(phonePrefixOptions)) {
    phonePrefixOptions = phonePrefixOptions.options
  }
  const optionStore = createOptionStore(
    [],
    suggestionsLength,
    isEmptyAllowed,
    getKey,
    getDisplayValue || getDisplayValueDefault
  )
  if (topOptions) {
    topOptions.map(key => optionStore.add(getPhonePrefixOption(key)))
  }
  phonePrefixOptions.sort(sortByLabel)
  phonePrefixOptions.map(option => optionStore.add(getPhonePrefixOption(optionStore.getKey(option))))
</script>

<CountrySelector {displayMode} 
  inputComponent={PrefixFlagInput}
  isSuggestionListPinnable={true}
  {renderSuggestion}
  bind:value={value}
  values={optionStore}
  {...passthrough} />
