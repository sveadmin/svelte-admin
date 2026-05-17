<script lang="ts">
  import {
    mergeProperties,
  } from '$lib/helper/index.js'

  import {
    NUMBER_CURRENCY_DISPLAY_NAME,
  } from '$lib/number/index.js'

  import {
    NumberDisplayWrapped,
  } from '$lib/number-display/index.js'

  import type {
    CurrencyDisplayWrappedProps,
  } from './types.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import CurrencyDisplay from './currency-display.svelte'

  import '$lib/number-display/number-display.css'

  let {
    childrenConfig,
    currency,
    currencyDisplay,
    fractionDigits,
    fractionWidth,
    value = $bindable(),
    ...passthrough
  } : CurrencyDisplayWrappedProps = $props()

  const digitConfig = $derived(mergeProperties(
    {
      currency: (fractionWidth
        && currencyDisplay === NUMBER_CURRENCY_DISPLAY_NAME)
        ? undefined
        : currency,
      currencyDisplay,
    },
    childrenConfig?.digit,
    childrenConfig?.[0],
    passthrough
  ))

  const fractionConfig = $derived(mergeProperties(
    {
      currency: (currencyDisplay === NUMBER_CURRENCY_DISPLAY_NAME)
        ? currency
        : undefined,
      currencyDisplay,
      fractionDigits,
    },
    childrenConfig?.fraction,
    childrenConfig?.[1],
    passthrough
  ))

  let configParsed = $derived({
    digit: digitConfig,
    fraction: fractionConfig,
  })
</script>

<NumberDisplayWrapped {...passthrough}
  childrenConfig={configParsed}
  displayComponent={CurrencyDisplay}
  {fractionWidth}
  bind:value />