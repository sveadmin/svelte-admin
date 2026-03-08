<script lang="ts">

  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import type {
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    COMPONENT_DROPDOWN_SEARCH,
  } from '$lib/dropdown-search/types.js'

  import type {
    SveaComponentDropdown,
  } from '$lib/dropdown-search/types.js'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import {
    COMPONENT_LITERAL,
  } from '$lib/literal/types.js'

  import type {
    TextInputPartText
  } from '$lib/text-input/index.js';


  import type {
    CurrencyInputProps,
  } from './types.js'

  let {
    amount = $bindable(0),
    class: classList = $bindable([]),
    currencies,
    currency = $bindable(),
    decimalSeparator = ',',
    fractionDigits = 0,
    id = $bindable('currency-input-' + Math.random().toString(36).substring(2, 6)),
    size,
    validators = createFieldValidator([]),
    ...passthrough
  } : CurrencyInputProps = $props()

  let classes = $derived(normalizeArray(classList, ' ')),
    valueHelper: ValueHelperStore = $state({
      current: amount,
      inputFocused: false,
      display: '',
      original: amount,
      suggestionSelectionInProgress: false,
      value: amount,
    })

  const numberConfig : TextInputPartText = $derived({
      ...passthrough,
      isAttachedOnRight: true,
      class: classes,
      style: 'text-align: right',
      type: 'number',
      validators
    }
  )

  const dropdownConfig : SveaComponentDropdown = {
    input: {
      config: {
        allowedKeys: ['/[0-9\.,]/'],
        autoCompleteOnSingleSuggestion: true,
        isAttachedOnLeft: true,
        isCurrentValueVisible: false,
        isSuggestionListVisible: true,
        // keyMap: inputKeyMap,
        size,
        values: currencies,
        visibleWidth: '3ch',
      }
    },
    type: COMPONENT_DROPDOWN_SEARCH,
  } 

  let mask = $derived([numberConfig, dropdownConfig])


  // $effect(() => {
  //   valueHelper.display = getDisplayValue(valueHelper.value)
  // })

  // $effect(() => {
  //   amount = valueHelper.value as number
  // })

  // const updateCurrency = (event: CustomEvent<string | null>) => {
  //   currencyId = event.detail
  // }

  // onMount(() => {
  //   if (typeof getValue === 'function') {
  //     value = getValue()
  //   }
  // })
</script>

<InputCluster {mask}
  {size}
  bind:value={amount} />
