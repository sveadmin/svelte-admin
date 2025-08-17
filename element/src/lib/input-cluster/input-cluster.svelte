<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    i18n,
    rune,
  } from '@sveadmin/common'

  import type {
    IsValid,
    Rune,
    ValidatorStore,
  } from '@sveadmin/common'
  
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_PASSWORD,
    TEXT_INPUT_TYPE_TEL,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

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
    NumberInput,
  } from '$lib/number-input/index.js'

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
    prepareOnBlur,
    prepareOnChange,
    prepareOnFocus,
  } from './action/index.js'

  import {
    clearButton,
    copyButton,
  } from './config/index.js'

  import {
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
    joiner,
    id = $bindable('input-cluster' + Math.random().toString(36).substring(2, 6)),
    isClearButtonEnabled = false,
    isCopyButtonEnabled = false,
    keyMap,
    mask = $bindable(),
    onBlur: onBlurReceived,
    onChange: onChangeReceived,
    onError: onErrorReceived,
    onFocus: onFocusReceived,
    size,
    splitter,
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
    valueParts: Rune<any[]> = $state(rune([] as any[]))

  let nestedErrors: ValidatorStore[] = $derived.by(() => {
    return Object.values(nestedValidators).filter((validator: ValidatorStore) => !validator.result.valid)
  })

  const defaultArrayJoiner : ((valueParts: any[], dynamicParts?: any) => any) = (valueParts, dynamicParts) => valueParts[0]
  if (typeof splitter === 'function') {
    valueParts = rune(splitter(value, dynamicParts))
  } else {
    if (value.isRune) {
      valueParts = value
    } else {
      if (Array.isArray(value)) {
        valueParts = rune(value)
      } else {
        valueParts = rune([value])
        joiner = joiner ?? defaultArrayJoiner
      }
    }
  }

  const onBlur = prepareOnBlur(inFocus, onBlurReceived)
  const onChange = prepareOnChange(validators, onChangeReceived)
  const onError = onErrorReceived
  const onFocus = prepareOnFocus(inFocus, onFocusReceived)
  const clearAction = () => {
    for (let i = 0; i < dynamicParts.length; i += 1) {
      valueParts.value[i] = null
    }
  }
  const copyAction = () => {
    if (!value) {
      return
    }
    if (Array.isArray(value)) {
      navigator.clipboard.writeText(value.join(''))
      return
    }
    navigator.clipboard.writeText(value.toString())
  }
  const clearButtonConfig = clearButton(clearAction, size)
  const copyButtonConfig = copyButton(copyAction, size)

  const maskPartReducer = prepareMaskPartReducer({
    id,
    keyMap,
    nestedValidators,
    onBlur,
    onChange,
    onError,
    onFocus,
    size,
  })

  let expandedMask : InputMask = $state([])
  
  $effect(() => {
    expandedMask = mask.reduce(maskPartReducer, [])
    untrack(() => {
      dynamicPartMap = expandedMask.reduce(dynamicPartsReducer, {})
      dynamicParts = Object.keys(dynamicPartMap).map((realIndex: string) => {
        const dynamicPart = expandedMask[parseInt(realIndex)] as TextInputPartObjects
        return dynamicPart
      })
      if (dynamicParts.length > valueParts.value.length) {
        for (let i = valueParts.value.length; i < dynamicParts.length; i += 1) {
          valueParts.value.push(null)
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
    value = (joiner)
      ? joiner(valueParts.value, dynamicParts)
      : valueParts.value
  })

  $effect(() => {
    if (nestedErrors.length > 0) {
      lastError = nestedErrors[0].result
      return
    }
    untrack(() => {
      lastError = validators.validate(value)

      const index = localClasses.indexOf('error')

      if (validators.result.valid) {
        if (index !== -1) {
          localClasses.splice(index, 1)
        }
        return
      }
      if (index === -1) {
        localClasses.push('error')
      }
    })
  })

// $inspect('MASK', mask)
// $inspect('EXTENDED MASK', expandedMask)
// $inspect('NIPIUT LENGTH', inputLength)
// $inspect('PPPPVVVVV', valueParts)
// $inspect('NYESZTED', nestedValidators, nestedErrors)
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
      class={localClasses}
      data={{...data, index: dynamicPartMap[index]}}
      isBorderVisible={true}
      {validators} 
      bind:value={value} />
  {:else if maskPiece.type === COMPONENT_IMAGE}
    {@render renderImage(maskPiece as InputPartImage, localClasses)}
  {:else if maskPiece.type === TEXT_INPUT_TYPE_NUMBER
      || maskPiece.type === TEXT_INPUT_TYPE_TEL} 
      <NumberInput {...maskPiece}
        {...maskPiece.editor}
        data={{...data, index: dynamicPartMap[index]}}
        class={[...localClasses, ...maskPiece?.class ?? []]}
        type={maskPiece.type}
        validators={nestedValidators[index]}
        bind:value={valueParts.value[dynamicPartMap[index]]} />
  {:else}
    <TextInput {...maskPiece}
      {...maskPiece.editor}
      data={{...data, index: dynamicPartMap[index]}}
      class={[...localClasses, ...maskPiece?.class ?? []]}
      type={maskPiece.type}
      validators={nestedValidators[index]}
      bind:value={valueParts.value[dynamicPartMap[index]]} />
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