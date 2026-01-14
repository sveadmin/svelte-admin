<script lang="ts">
  import {
    createFieldValidator,
    i18n,
    regexValidator,
  } from '@sveadmin/common'

  import type {
    ValidatorStore,
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
    TextInputPartNumber,
  } from '$lib/number/types.js'

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
    prepareValueToString,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    allowedSeparators = [],
    class: classList = $bindable([]),
    decimalSeparator = ',',
    fractionDigits = 0,
    id = $bindable('number-input-' + Math.random().toString(36).substring(2, 6)),
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

  const numberValidators: ValidatorStore = createFieldValidator([]),
    separators: string[] = [decimalSeparator],
    valueToString = prepareValueToString(decimalSeparator)

  if (isIncorrectDecimalSeparatorAllowed) {
    separators.push(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator])
  }

  let classes = $derived(normalizeArray(classList, ' ')),
    inputKeyMap: KeyMap = {
      ...numberKeyMap,
      ['^' + decimalSeparator]: prepareJumpToNext(),
      ...keyMap,
    },
    maximumFractionDigits: number = 0,
    minimumFractionDigits: number | undefined,
    valueAsString: string = $derived.by(() => valueToString(value)),
    valueGuard: string | number | null = null,
    valueHelper: ValueHelperStore = $state({
      value: valueAsString,
    })

  let allowedNumberKeys : string[] = [...allowedKeys, '-']

  if (fractionDigits > 0) {
    allowedSeparators.push(...separators)
  } else {
    allowedNumberKeys.push(...separators)
  }

  if (Array.isArray(fractionDigits)) {
    if (fractionDigits[0] !== null) {
      maximumFractionDigits = fractionDigits[0]
    }
    minimumFractionDigits = fractionDigits[1]
  } else {
    maximumFractionDigits = fractionDigits
  }

  if ((maximumFractionDigits > 0)) {
    splitter = prepareSplitter(maximumFractionDigits, decimalSeparator)
    joiner = prepareJoiner(decimalSeparator)
    numberValidators.appendValidator(
      regexValidator({
        errorMessage: 'invalidNumber',
        pattern: '^-?\\d+$',
      })
    )
  } else {
    numberValidators.appendValidator(
      regexValidator({
        errorMessage: 'invalidNumber',
        pattern: '^-?\\d+[\\' + separators.join('\\') + ']?\\d*$',
      })
    )
  }

  const numberConfig : TextInputPartText = $derived.by(() => {
    const mergedClasses = [...classes]
    let localMask: TextInputPartNumber = {}

    if (mask
      && mask[0]) {
      localMask = mask[0] as TextInputPartNumber
      if (localMask.class) {
        mergedClasses.push(...normalizeArray(localMask.class, ' '))
        delete localMask.class
      }
    }

    return {
      ...passthrough,
      ...localMask,
      allowedKeys: allowedNumberKeys,
      allowedSeparators: allowedSeparators,
      areErrorsVisible: false,
      isAttachedOnRight: fractionDigits > 0,
      class: mergedClasses,
      keyMap: inputKeyMap,
      style: 'text-align: right',
      type: 'number',
      validators: numberValidators
    }
  })

  const decimalSeparatorConfig : InputPartLiteral = decimalSeparatorGenerator(decimalSeparator, size)
  const defaultFractionConfig = fractionGenerator(maximumFractionDigits, size)

  const fractionConfig : TextInputPartText = $derived.by(() => {
    const mergedClasses = [...classes]
    let localMask: TextInputPartNumber = {}

    if (mask
      && mask[1]) {
      localMask = mask[1] as TextInputPartNumber
      if (localMask.class) {
        mergedClasses.push(...normalizeArray(localMask.class, ' '))
        delete localMask.class
      }
    }

    return {
      ...passthrough,
      ...localMask,
      ...defaultFractionConfig,
      allowedKeys,
      allowedSeparators,
      class: mergedClasses,
      keyMap: inputKeyMap,
      type: 'number',
    }
  })

  let clusterMask = $derived((maximumFractionDigits > 0)
    ? [numberConfig, decimalSeparatorConfig, fractionConfig]
    : [numberConfig])


  // $effect(() => {
  //   const newValues : Array<number | null> = getDisplayValue(valueHelper.value as number)
  //   let current = valueHelper.current as Array<number | null>
  //   current.splice(0, Infinity, ...newValues)
  // })

  $effect(() => {
    // This is needed as the Proxy value gets "cached" before tick, and can revert the value back to the original
    if (valueGuard !== valueHelper.value) {
      const parsedValue =  parseFloat(valueHelper.value?.toString().replace(',', '.') ?? '')
      value = (isNaN(parsedValue))
        ? null
        : parsedValue
      valueGuard = valueHelper.value
    }
  })

  $effect(() => {
    valueAsString = valueToString(value)
    if (valueAsString !== valueHelper.value) {
      valueHelper.value = valueAsString 
    }
  })
$inspect('NINOUT? VH', valueHelper)
</script>

<InputCluster {isClearButtonEnabled}
  {isCopyButtonEnabled}
  {joiner}
  mask={clusterMask}
  {size}
  {splitter}
  {validators}
  bind:value={valueHelper.value}
  {...passthrough} />
