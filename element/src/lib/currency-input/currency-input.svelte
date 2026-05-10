<script lang="ts">

  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import {
    COMPONENT_DROPDOWN_SEARCH,
  } from '$lib/dropdown-search/index.js'

  import type {
    ComponentDropdown,
  } from '$lib/dropdown-search/index.js'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import {
    COMPONENT_NUMBER_INPUT,
  } from '$lib/number-input/index.js'

  import type {
    ComponentNumberInput,
  } from '$lib/number-input/index.js'

  import type {
    CurrencyInputProps,
  } from './types.js'

  import {
    currencyOptions as defaultCurrencyOptions,
  } from './config/index.js'


  let {
    class: classList = $bindable([]),
    currencies = defaultCurrencyOptions,
    currency = $bindable(),
    decimalSeparator = ',',
    isCurrencyOnRight = true,
    fractionDigits = 0,
    id = $bindable('currency-input-' + Math.random().toString(36).substring(2, 6)),
    mask,
    size,
    validators = createFieldValidator([]),
    value = $bindable(0),
    ...passthrough
  } : CurrencyInputProps = $props()

  let classes = $derived(normalizeArray(classList, ' '))
    // valueHelper: ValueHelperStore = $state({
    //   current: value,
    //   inputFocused: false,
    //   display: '',
    //   original: value,
    //   suggestionSelectionInProgress: false,
    //   value,
    // })

  const amountComponent : ComponentNumberInput = $derived(
    {
      input: {
        config: {
          ...passthrough,
          areErrorsVisible: false,
          class: classes,
          fractionDigits,
          isAttachedOnRight: isCurrencyOnRight,
          isAttachedOnLeft: !isCurrencyOnRight,
          isCopyButtonEnabled: false,
          style: 'text-align: right',
          validators
        }
      },
      type: COMPONENT_NUMBER_INPUT,
    }
  )

  const currencyComponent : ComponentDropdown = $derived(
    {
      input: {
        config: {
          allowedKeys: ['/[0-9\.,]/'],
          isAttachedOnRight: !isCurrencyOnRight,
          isAttachedOnLeft: isCurrencyOnRight,
          isValueSetAutomaticallyOnSingleSuggestion: true,
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
  )

  let extendedMask = $derived.by(() => {
      if (mask) {
        return mask
      }

      return (isCurrencyOnRight)
        ? '$(amount)$(currency)'
        : '$(currency)$(amount)'
    
    }),
    components = $derived({
      amount: amountComponent,
      currency: currencyComponent,
    })
$inspect(components)
</script>

<Cluster componentConfig={components}
  mask={extendedMask}
  {size}
  bind:value />
