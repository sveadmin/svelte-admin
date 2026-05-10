<script lang="ts">
  import {
    NUMBER_STYLE_CURRENCY,
    parseNumberMask,
  } from '$lib/number/index.js'

  import type {
    NumberOptions,
  } from '$lib/number/index.js'

  import {
    TextDisplay,
   } from '$lib/text-display/index.js'

  import {
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
  } from '$lib/number-display/helper/index.js'

  import {
    optionConverterCurrency,
    optionConverterCurrencyDisplay,
    optionConverterCurrencySign,
  } from './helper/index.js'

  import type {
    CurrencyDisplayProps,
  } from './types.js'

  let {
    locale,
    mask,
    value = $bindable(),
    ...passthrough
  } : CurrencyDisplayProps = $props()

  let options: NumberOptions = {}

  let optionConverters: Array<(parameters: Omit<CurrencyDisplayProps, 'value'>, options: NumberOptions) => void> = [
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
    optionConverterCurrency,
    optionConverterCurrencyDisplay,
    optionConverterCurrencySign,
  ]
  
  optionConverters.map(currentFn => currentFn(passthrough, options))

  if (Object.keys(options).length > 0
    && options.currency) {
    options.style = NUMBER_STYLE_CURRENCY
  }

  mask = parseNumberMask(
    mask,
    options,
    locale,
  )
</script>

<TextDisplay {mask} bind:value={value} {...passthrough} />
