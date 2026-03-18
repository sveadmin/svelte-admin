<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from '$lib/text-display/text-display.svelte'

  import {
    NUMBER_STYLE_CURRENCY,
    NUMBER_STYLE_UNIT,
  } from '$lib/number/index.js'

  import {
    spreadOptions,
  } from '$lib/number/index.js'

  import type {
    NumberOptions,
  } from '$lib/number/index.js'

  import {
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
  } from '$lib/number-display/helper/index.js'

  import {
    optionConverterUnit,
    optionConverterUnitDisplay
  } from './helper/index.js'

  import type {
    UnitDisplayProps,
  } from './types.js'

  let {
    locale,
    mask,
    value = $bindable(),
    ...passthrough
  } : UnitDisplayProps = $props()

  let options: NumberOptions = {}

  let optionConverters: Array<(parameters: Omit<UnitDisplayProps, 'value'>, options: NumberOptions) => void> = [
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
    optionConverterUnit,
    optionConverterUnitDisplay
  ]
  
  optionConverters.map(currentFn => currentFn(passthrough, options))

  if (Object.keys(options).length > 0
    && options.unit) {
    options.style = NUMBER_STYLE_UNIT
  }

  mask = spreadOptions(
    mask,
    options,
    locale,
  )
</script>

<TextDisplay {mask} bind:value={value} {...passthrough} />
