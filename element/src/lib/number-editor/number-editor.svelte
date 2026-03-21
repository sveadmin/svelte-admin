<script lang="ts" async>

  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import type {
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import type {
    SveaComponentLiteral
  } from '$lib/literal/types.js'

  import {
    optionConverterFractionDigits,
    optionConverterRemoveIntegerPart,
    optionConverterRoundingMode,
    optionConverterSignDisplay,
    optionConverterUseGrouping,
    optionConverterZeroPadded,
  } from '$lib/number-display/index.js'

  import type {
    NumberDisplayProps,
  } from '$lib/number-display/index.js'

  import {
    NUMBER_STYLE_DECIMAL,
  } from '$lib/number/types.js'

  import type {
    NumberOptions,
  } from '$lib/number/types.js'

  import {
    spreadOptions,
  } from '$lib/number/index.js'

  import type {
    TextInputPartText
  } from '$lib/text-input/index.js';


  import type {
    NumberInputProps,
  } from './types.js'

  import {
    prepareFocus,
  } from './action/index.js'

  import {
    decimalSeparatorGenerator,
    fractionGenerator,
  } from './config/index.js'

  import {
    prepareGetDisplayValue,
  } from './helper/index.js'

  let {
    class: classList = $bindable([]),
    decimalSeparator = ',',
    fractionDigits = 0,
    id = $bindable('currency-input-' + Math.random().toString(36).substring(2, 6)),
    locale,
    mask,
    onFocus,
    size,
    validators = createFieldValidator([]),
    value = $bindable(0),
    ...passthrough
  } : NumberInputProps = $props()

  let classes = $derived(normalizeArray(classList, ' ')),
    getDisplayValue: (value: number) => string = $state((value: number) => value.toString()),
    valueHelper: ValueHelperStore = $state({
      current: [value],
      inputFocused: false,
      display: [],
      original: value,
      suggestionSelectionInProgress: false,
      value,
    })

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

  async function loadGetDisplayValue() {
    if (!mask) {
      return
    }
    getDisplayValue = await prepareGetDisplayValue(mask)
  }

  const onInputFocus = prepareFocus(valueHelper, onFocus)

  const numberConfig : TextInputPartText = $derived({
      ...passthrough,
      isAttachedOnRight: fractionDigits > 0,
      class: classes,
      style: 'text-align: right',
      type: 'number',
      validators
    }
  )

  const decimalSeparatorConfig : SveaComponentLiteral = decimalSeparatorGenerator(decimalSeparator, size)

  const fractionConfig : TextInputPartText = $derived({
      ...passthrough,
      ...fractionGenerator(fractionDigits, size),
      class: classes,
      validators,
    }
  )

  let clusterMask = $derived((fractionDigits > 0)
    ? [numberConfig, decimalSeparatorConfig, fractionConfig]
    : [numberConfig])


  $effect(() => {
    valueHelper.display = getDisplayValue(valueHelper.value as number)
    // const newValues : number[] = getDisplayValue(valueHelper.value as number)
    // let current = valueHelper.current as number[]
    // current.splice(0, Infinity, ...newValues)
  })

  $effect(() => {
    const x = valueHelper.display
    console.log('valuehelper display changed', valueHelper.display)
  })

  $effect(() => {
    value = valueHelper.value as number
  })

  loadGetDisplayValue()
$inspect(valueHelper)
</script>

<Cluster mask={clusterMask}
  onFocus={onInputFocus}
  {size}
  value={(valueHelper.inputFocused) ? valueHelper.current : valueHelper.display} />
