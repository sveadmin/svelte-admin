<script lang="ts">

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

  import type {
    TextInputPartText
  } from '$lib/text-input/index.js';

  import {
    DECIMAL_SEPARATOR_CONVERTER,
  } from './types.js'

  import type {
    NumberInputProps,
  } from './types.js'

  import {
    decimalSeparatorGenerator,
    fractionGenerator,
    numberKeyMap,
  } from './config/index.js'

  import {
    prepareJoiner,
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
    isIncorrectDecimalSeparatorAllowed = true,
    joiner = (value: any[]) => value[0],
    keyMap,
    locale = 'sv-SE',
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
    valueAsString: string = value.toString().replace(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator], decimalSeparator),
    valueHelper: ValueHelperStore = $state({
      current: [valueAsString],
      inputFocused: false,
      display: [],
      original: valueAsString,
      suggestionSelectionInProgress: false,
      value: valueAsString,
    })

  let allowedNumberKeys : string[] = [...allowedKeys, '-'],
    allowedNumberSeparators : string[] = []

  if (fractionDigits > 0) {
    allowedNumberSeparators.push(decimalSeparator)
    if (isIncorrectDecimalSeparatorAllowed) {
      allowedNumberSeparators.push(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator])
    }
  } else {
    allowedNumberKeys.push(decimalSeparator)
    if (isIncorrectDecimalSeparatorAllowed) {
      allowedNumberKeys.push(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator])
    }
  }

console.log('ANS', allowedNumberSeparators)

  const numberConfig : TextInputPartText = $derived({
      ...passthrough,
      allowedKeys: allowedNumberKeys,
      allowedSeparators: (maximumFractionDigits > 0) ? allowedNumberSeparators : allowedSeparators,
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
      allowedSeparators,
      class: classes,
      keyMap: inputKeyMap,
      validators,
    }
  )

  let clusterMask = $derived((maximumFractionDigits > 0)
    ? [numberConfig, decimalSeparatorConfig, fractionConfig]
    : [numberConfig])

  if ((maximumFractionDigits > 0)) {
    splitter = prepareSplitter(maximumFractionDigits, decimalSeparator)
    joiner = prepareJoiner(decimalSeparator)
  }


  // $effect(() => {
  //   const newValues : Array<number | null> = getDisplayValue(valueHelper.value as number)
  //   let current = valueHelper.current as Array<number | null>
  //   current.splice(0, Infinity, ...newValues)
  // })

  $effect(() => {
    value = parseFloat((valueHelper.value?.toString() ?? '').replace(',', '.'))
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
