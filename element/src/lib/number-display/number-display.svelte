<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from '$lib/text-display/text-display.svelte'

  import {
    NUMBER_STYLE_DECIMAL,
  } from '$lib/number/index.js'

  import type {
    NumberOptions,
  } from '$lib/number/index.js'

  import {
    spreadOptions,
  } from '$lib/number/index.js'

  import type {
    NumberDisplayProps,
  } from './types.js'

  import {
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
  } from './helper/index.js'

  let {
    locale,
    mask,
    value = $bindable(),
    ...passthrough
  } : NumberDisplayProps = $props()

  let options: NumberOptions = {}

  let optionConverters: Array<(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) => void> = [
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
  ]
  
  optionConverters.map(currentFn => currentFn(passthrough, options))

  if (Object.keys(options).length > 0) {
    options.style = NUMBER_STYLE_DECIMAL
  }

  mask = spreadOptions(
    mask,
    options,
    locale,
  )
</script>

<TextDisplay {mask} bind:value={value} {...passthrough} />
