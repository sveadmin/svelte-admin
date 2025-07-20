<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    rune,
    type IsValid,
  } from '@sveadmin/common'
  
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_PASSWORD,
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
  } from '$lib/dropdown-search/index.js'

  import type {
    InputPartDropdown,
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
    prepareMaskPartReducer,
  } from './helper/index.js'

  import {
    renderButton,
  } from './render-button.svelte'

  import {
    renderDropdownSearch,
  } from './render-dropdown-search.svelte'

  import {
    renderLiteral,
  } from './render-literal.svelte'

  import {
    renderImage,
  } from './render-image.svelte'

  import './input-cluster.css'

  let {
    areErrorsVisible = true,
    data = {},
    error,
    joiner,
    mask = $bindable(),
    onBlur: onBlurReceived,
    onChange: onChangeReceived,
    onFocus: onFocusReceived,
    size,
    splitter,
    validators = createFieldValidator([]),
    value = $bindable([])
  } : InputClusterProps = $props()

  if (!Array.isArray(mask)) {
    mask = [mask ?? '']
  }

  let dynamicPartMap: {[key: number] : number} = {},
    dynamicParts: TextInputPartObjects[] = [],
    lastError: IsValid = $state({valid: true}),
    localClasses: string[] = $state([]),
    inFocus = $state({value: false}),
    valueParts: {value: any[]} = $state({value: []})

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
  const onError = (error: Error) => {
    lastError = {
      ...error.cause as IsValid
    }
    console.log(error, error.cause)
  }
  const onFocus = prepareOnFocus(inFocus, onFocusReceived)

  const maskPartReducer = prepareMaskPartReducer({
    dynamicParts,
    dynamicPartMap,
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
      if (dynamicParts.length > valueParts.value.length) {
        for (let i = valueParts.value.length; i < dynamicParts.length; i += 1) {
          valueParts.value.push(null)
        }
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

$inspect('MASK', mask)

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
    {@render renderDropdownSearch(maskPiece as InputPartDropdown, localClasses)}
  {:else if maskPiece.type === COMPONENT_IMAGE}
    {@render renderImage(maskPiece as InputPartImage, localClasses)}
  {:else}
    {#if maskPiece.type === TEXT_INPUT_TYPE_NUMBER
      || maskPiece.type === TEXT_INPUT_TYPE_PASSWORD
      || maskPiece.type === TEXT_INPUT_TYPE_TEXT}
      <TextInput {...maskPiece}
        {...maskPiece.editor}
        data={{...data, index: dynamicPartMap[index]}}
        class={[...localClasses, ...maskPiece?.editor?.class ?? []]}
        type={maskPiece.type} 
        bind:value={valueParts.value[dynamicPartMap[index]]} />
    {/if}
  {/if}
{/each}
{#if areErrorsVisible}
  {#if typeof error === 'function'}
    {@render error(lastError)}
  {:else}
    <InputError isValid={lastError} />
  {/if}
{/if}