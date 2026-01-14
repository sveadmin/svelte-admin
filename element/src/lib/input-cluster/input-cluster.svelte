<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    i18n,
  } from '@sveadmin/common'

  import type {
    IsValid,
    ValidatorStore,
  } from '@sveadmin/common'
  
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_PASSWORD,
    TEXT_INPUT_TYPE_TEL,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import {
    mergeClasses,
    mergeStyles,
    wrapOnBlur,
    wrapOnEvent,
    wrapOnFocus,
    wrapOnInput,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_BUTTON,
  } from '$lib/button/index.js'

  import type {
    ButtonProps
  } from '$lib/button/index.js'

  import {
    COMPONENT_DROPDOWN_SEARCH,
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import {
    createValueHelperStore,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_IMAGE,
  } from '$lib/image/index.js'

  import {
    InputError,
  } from '$lib/input/index.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
  } from '$lib/literal/index.js'

  import type {
    InputPartLiteral,
  } from '$lib/literal/index.js'

  import type {
    InputPartImage,
  } from '$lib/image/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    InputMask,
    TextInputPartObjects,
  } from '$lib/text-input/index.js'

  import type {
    InputClusterProps,
  } from './types.js'

  import {
    prepareClear,
    prepareCopy,
    prepareOnBlur,
    prepareOnFocus,
  } from './action/index.js'

  import {
    clearButton,
    copyButton,
  } from './config/index.js'

  import {
    defaultJoiner,
    defaultSplitter,
    dynamicPartsReducer,
    prepareMaskPartReducer,
  } from './helper/index.js'

  import {
    renderButton,
  } from './render-button.svelte'

  import {
    renderLiteral,
  } from './render-literal.svelte'

  import {
    renderImage,
  } from './render-image.svelte'

  import './input-cluster.css'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  let {
    areErrorsVisible = true,
    data = {},
    error,
    joiner = defaultJoiner,
    id = $bindable('input-cluster-' + Math.random().toString(36).substring(2, 6)),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = false,
    keyMap,
    mask = $bindable(),
    onBlur: onBlurReceived,
    onChange,
    onFocus: onFocusReceived,
    onInit,
    onInput,
    onError,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    size,
    splitter = defaultSplitter,
    validators = createFieldValidator([]),
    value = $bindable([])
  } : InputClusterProps = $props()

  if (!Array.isArray(mask)) {
    mask = [mask ?? '']
  }

  let dynamicPartMap: {[key: number] : number} = $state({}),
    dynamicParts: TextInputPartObjects[] = $state([]),
    lastError: IsValid = $state({valid: true}),
    localClasses: string[] = $state([]),
    nestedValidators: {[key: number] : ValidatorStore} = $state({}),
    inFocus = $state({value: false}),
    valueHelper = createValueHelperStore()

  let nestedErrors: ValidatorStore[] = $derived.by(() => {
    return Object.values(nestedValidators).filter((validator: ValidatorStore) => !validator.result.valid)
  }),
    valueGuard : any

  const onBlur = wrapOnEvent(onBlurReceived, prepareOnBlur(inFocus))
  // const onBlur = (onBlurReceived)
  //   ? wrapOnEvent(onBlurReceived, prepareOnBlur(inFocus))
  //   : prepareOnBlur(inFocus)
  const onFocus = (onFocusReceived)
    ? wrapOnFocus(onFocusReceived, prepareOnFocus(inFocus))
    : prepareOnFocus(inFocus)

  const clearAction = prepareClear(valueHelper, () => dynamicParts.length)
  const copyAction = prepareCopy(valueHelper)
  const clearButtonConfig = clearButton(clearAction, size)
  const copyButtonConfig = copyButton(copyAction, size)

  const maskPartReducer = prepareMaskPartReducer({
    data,
    id,
    keyMap,
    nestedValidators,
    onBlur,
    onInit,
    onChange,
    onError,
    onFocus,
    onInput,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    size,
  })

  let expandedMask : InputMask = $state([])
  
  if (!Array.isArray(valueHelper.display)) {
    valueHelper.display = []
  }

  $effect(() => {
    expandedMask = mask.reduce(maskPartReducer, [])
    untrack(() => {
      dynamicPartMap = expandedMask.reduce(dynamicPartsReducer, {})
      dynamicParts = Object.keys(dynamicPartMap).map((realIndex: string) => {
        const dynamicPart = expandedMask[parseInt(realIndex)] as TextInputPartObjects
        return dynamicPart
      })
      if (dynamicParts.length > (valueHelper.display?.length ?? 0)) {
        if (!Array.isArray(valueHelper.display)) {
          valueHelper.display = []
        }
        for (let i = valueHelper.display.length; i < dynamicParts.length; i += 1) {
          valueHelper.display.push('')
        }
      }

      if (isCopyButtonEnabled) {
        expandedMask.push(copyButtonConfig)
      }
      if (isClearButtonEnabled) {
        expandedMask.push(clearButtonConfig)
      }
    })

  })

  $effect(() => {
    const index = localClasses.indexOf('focus')
    if (!inFocus.value) {
      if (index !== -1) {
        localClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localClasses.push('focus')
    }
  })

  $effect(() => {
    if (JSON.stringify(value) !== JSON.stringify(valueGuard)) {
      valueHelper.display = splitter(value)
      valueGuard = value
    }
  })

  $effect(() => {
    const display = valueHelper.display
    let valid = true
    untrack(() => {
    console.log('GOOO falidate')
      if (!display
        || typeof display === 'string') {
        return
      }
      valueHelper.value = joiner(display, dynamicParts)
      validators.validate(valueHelper.value)
      valid = validators.result.valid
    })
    value = valueHelper.value
    const index = localClasses.indexOf('error')

    if (valid) {
      if (index !== -1) {
        localClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localClasses.push('error')
    }
  })

  $effect(() => {
    if (nestedErrors.length > 0) {
      lastError = nestedErrors[0].result
      return
    } else {
      lastError = validators.result
    }
  })

// $inspect('MASK', mask)
// $inspect(mask, 'EXTENDED MASK', expandedMask)
// $inspect('NIPIUT LENGTH', inputLength)
// $inspect('PPPPVVVVV', valueParts, valueHelper)
$inspect('PPPPVVVVV', valueHelper.value, value)
$inspect('VVVVVVVVVVALSI', validators)
$inspect('NJESZTED', nestedValidators, 'nested',  nestedErrors)
$inspect('LSATERRERO', lastError)
// $inspect('overall', validators)
</script>

{#each expandedMask as maskPiece, index}
  {#if typeof maskPiece === 'string'}
    {@render renderLiteral({
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: maskPiece
    })}
  {:else if maskPiece.type === TEXT_DISPLAY_TYPE_LITERAL}
    {@render renderLiteral(maskPiece as InputPartLiteral)}
  {:else if maskPiece.type === COMPONENT_BUTTON}
    {@render renderButton(maskPiece as ButtonProps, localClasses)}
  {:else if maskPiece.type === COMPONENT_DROPDOWN_SEARCH}
    <DropdownSearch {...maskPiece}
      {...maskPiece.editor}
      childrenStyle="background-color:transparent"
      class={mergeClasses(localClasses, maskPiece.class)}
      bind:instance={maskPiece.instance}
      isBorderVisible={true}
      validators={nestedValidators[index]}
      bind:value={valueHelper.display![dynamicPartMap[index]]} />
  {:else if maskPiece.type === COMPONENT_IMAGE}
    {@render renderImage(maskPiece as InputPartImage, localClasses)}
  {:else if maskPiece.type === TEXT_INPUT_TYPE_NUMBER
    || maskPiece.type === TEXT_INPUT_TYPE_PASSWORD
    || maskPiece.type === TEXT_INPUT_TYPE_TEL 
    || maskPiece.type === TEXT_INPUT_TYPE_TEXT}
    {#key maskPiece.style}
      <TextInput {...maskPiece}
        {...maskPiece.editor}
        class={mergeClasses(localClasses, maskPiece.class)}
        bind:instance={maskPiece.instance}
        type={maskPiece.type}
        validators={nestedValidators[index]}
        bind:value={valueHelper.display![dynamicPartMap[index]]} />
    {/key}
  {/if}
{/each}
<input {id} type="hidden" {value} />
{#if areErrorsVisible}
  {#if typeof error === 'function'}
    {@render error(lastError)}
  {:else}
    <InputError isValid={lastError} {size} />
    {#if (nestedErrors.length > 1)}
      <InputError isValid={{valid: false, message: i18n.t('additionalErrors', {count: nestedErrors.length - 1}) ?? 'additionalErrors'}} {size} />
    {/if}
  {/if}
{/if}