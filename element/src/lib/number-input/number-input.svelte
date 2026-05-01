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
    propertyMerger,
  } from '$lib/helper/index.js'

  import {
    prepareJumpToNext,
  } from '$lib/input/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import type {
    ComponentTextDisplayWrapped
  } from '$lib/text-display/index.js';

  import {
    COMPONENT_TEXT_INPUT,
  } from '$lib/text-input/index.js';

  import type {
    ComponentTextInput
  } from '$lib/text-input/index.js';

  import {
    DECIMAL_SEPARATOR_CONVERTER,
  } from './types.js'

  import type {
    NumberInputProps,
  } from './types.js'

  import {
    decimalSeparatorGenerator,
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
    childrenConfig,
    data,
    decimalSeparator = ',',
    fractionDigits = 0,
    id = $bindable('number-input-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    isClearButtonEnabled = false,
    isCopyButtonEnabled,
    isIncorrectDecimalSeparatorAllowed = true,
    joiner,
    keyMap,
    locale = 'sv-SE',
    mask,
    onFocus,
    precisionDigits = 1,
    size,
    splitter,
    validators = createFieldValidator([]),
    value = $bindable(0),
    ...passthrough
  } : NumberInputProps = $props()

  isCopyButtonEnabled = isCopyButtonEnabled ?? fractionDigits > 0

  const numberValidators: ValidatorStore = createFieldValidator([]),
    separators: string[] = [decimalSeparator],
    valueToString = prepareValueToString(decimalSeparator)

  let //classes = $derived(normalizeArray(classList, ' ')),
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

  if (isIncorrectDecimalSeparatorAllowed) {
    separators.push(DECIMAL_SEPARATOR_CONVERTER[decimalSeparator])
    inputKeyMap['^' + DECIMAL_SEPARATOR_CONVERTER[decimalSeparator]] = prepareJumpToNext()
  }

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
    splitter = splitter ?? prepareSplitter(maximumFractionDigits, decimalSeparator)
    joiner = joiner ?? prepareJoiner(decimalSeparator)
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

  const digitConfig : ComponentTextInput = $derived({
    input : {
      config: propertyMerger(
        childrenConfig?.digit,
        childrenConfig?.[0],
        passthrough,
        {
          allowedKeys: allowedNumberKeys,
          allowedSeparators: allowedSeparators,
          areErrorsVisible: false,
          isAttachedOnRight: fractionDigits > 0,
          // class: mergedClasses,
          keyMap: inputKeyMap,
          style: 'text-align: right',
          type: 'number',
          validators: numberValidators
        }
      )
    },
    type:COMPONENT_TEXT_INPUT
  })

  const decimalSeparatorConfig : ComponentTextDisplayWrapped = decimalSeparatorGenerator(decimalSeparator, size)

  const fractionConfig : ComponentTextInput = $derived({
    input : {
      config: propertyMerger(
        childrenConfig?.fraction,
        childrenConfig?.[1],
        passthrough,
        {
          allowedKeys,
          allowedSeparators,
          // class: mergedClasses,
          isAttachedOnLeft: true,
          keyMap: inputKeyMap,
          size,
          type: 'text',
          visibleWidth: fractionDigits + 'ch',
        }
      )
    },
    type:COMPONENT_TEXT_INPUT
  })

  let extendedMask = $derived(mask ?? '$(digit)' + ((maximumFractionDigits > 0) ? '$(decimalSeparator)$(fraction)' : '')),
    configParsed = $derived({
      decimalSeparator: decimalSeparatorConfig,
      digit: digitConfig,
      fraction: fractionConfig,
    })


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

// $inspect('config', id,  configParsed)
// $inspect('NINOUT? VH', valueHelper)
</script>

<Cluster childrenConfig={configParsed}
  {data}
  {id}
  bind:instance={instance}
  {isClearButtonEnabled}
  {isCopyButtonEnabled}
  {joiner}
  mask={extendedMask}
  {size}
  {splitter}
  {validators}
  bind:value={valueHelper.value}
  {...passthrough} />
