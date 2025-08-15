<script lang="ts" async>

  import {
    createFieldValidator,
  } from '@sveadmin/common'

  import type {
    KeyMap,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import {
    prepareJumpToNext,
  } from '$lib/input/index.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    InputPartLiteral
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
    TextDisplayPartNumber
  } from '$lib/number/types.js'

  import {
    spreadOptions,
  } from '$lib/text-display/index.js'

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
    numberKeyMap,
  } from './config/index.js'

  import {
    joiner as defaultJoiner,
    prepareSplitter,
  } from './helper/index.js'

  let {
    allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    allowedSeparators = ['.', ','],
    class: classList = $bindable([]),
    decimalSeparator = ',',
    fractionDigits = 0,
    id = $bindable('currency-input-' + Math.random().toString(36).substring(2, 6)),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = true,
    joiner = (value: any[]) => value[0],
    keyMap,
    locale,
    mask,
    onFocus,
    precisionDigits = 1,
    size,
    splitter = (value: any) => [value],
    validators = createFieldValidator([]),
    value = $bindable(0),
    ...passthrough
  } : NumberInputProps = $props()

  let classes = $derived(normalizeArray(classList, ' ')),
    inputKeyMap: KeyMap = {
      ...numberKeyMap,
      ['_' + decimalSeparator]: prepareJumpToNext(),
      ...keyMap,
    },
    maximumFractionDigits: number = 0,
    minimumFractionDigits: number | undefined,
    valueHelper: ValueHelperStore = $state({
      current: [value],
      inputFocused: false,
      display: [],
      original: value,
      suggestionSelectionInProgress: false,
      value,
    })

  const numberConfig : TextInputPartText = $derived({
      ...passthrough,
      allowedKeys: [...allowedKeys, '-'],
      allowedSeparators,
      isAttachedOnRight: fractionDigits > 0,
      class: classes,
      keyMap: inputKeyMap,
      style: 'text-align: right',
      type: 'number',
      validators
    }
  )

  if (Array.isArray(fractionDigits)) {
    if (fractionDigits[0] !== null) {
      maximumFractionDigits = fractionDigits[0]
    }
    minimumFractionDigits = fractionDigits[1]
  } else {
    maximumFractionDigits = fractionDigits
  }

  const decimalSeparatorConfig : InputPartLiteral = decimalSeparatorGenerator(decimalSeparator, size)
  const defaultFractionConfig = fractionGenerator(maximumFractionDigits, size)

  const fractionConfig : TextInputPartText = $derived({
      ...passthrough,
      ...defaultFractionConfig,
      allowedKeys,
      class: classes,
      keyMap: inputKeyMap,
      validators,
    }
  )

  let clusterMask = $derived((maximumFractionDigits > 0)
    ? [numberConfig, decimalSeparatorConfig, fractionConfig]
    : [numberConfig])

  if ((maximumFractionDigits > 0)) {
    splitter = prepareSplitter(maximumFractionDigits)
    joiner = defaultJoiner
  }


  // $effect(() => {
  //   const newValues : Array<number | null> = getDisplayValue(valueHelper.value as number)
  //   let current = valueHelper.current as Array<number | null>
  //   current.splice(0, Infinity, ...newValues)
  // })

  $effect(() => {
    value = valueHelper.value as number
  })

$inspect(valueHelper)
</script>

<InputCluster {isClearButtonEnabled}
  {isCopyButtonEnabled}
  {joiner}
  mask={clusterMask}
  {size}
  {splitter}
  bind:value={valueHelper.value} />
