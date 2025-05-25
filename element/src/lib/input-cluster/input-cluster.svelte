<script lang="ts">
  import {
    createFieldValidator,
    rune,
  } from '@sveadmin/common'
  
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL
  } from '$lib/literal/types.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    InputMask,
    InputPart,
    TextInputPartObjects,
  } from '$lib/text-input/index.js'

  import type {
    InputClusterProps,
  } from './types.js'

  import './input-cluster.css'

  let {
    data = {},
    joiner,
    mask,
    onChange = () => {
      validators.validate()
    },
    splitter,
    validators = createFieldValidator([]),
    value = $bindable()
  } : InputClusterProps = $props()

  if (!Array.isArray(mask)) {
    mask = [mask ?? '']
  }

  const maskPartReducer = (aggregator: InputMask, maskPiece: InputPart, index: number) : InputMask => {
    aggregator.push(maskPiece)

    if (typeof maskPiece === 'string') {
      return aggregator
    }

    if (maskPiece.type === TEXT_DISPLAY_TYPE_LITERAL) {
      if (maskPiece.editor
          && maskPiece.editor.borderless) {
          if (!lastDynamicPart.editor) {
            lastDynamicPart.editor = {}
          }
          lastDynamicPart.editor.isAttachedOnRight = true
          attachNext = true
        }
    } else {
      if (attachNext) {
        if (!maskPiece.editor) {
          maskPiece.editor = {}
        }
        maskPiece.editor.isAttachedOnLeft = true
        attachNext = false
      }
      dynamicPartMap[index] = dynamicParts.length
      dynamicParts.push(maskPiece)
      lastDynamicPart = maskPiece
    }

    return aggregator
  }

  // const registerNestedValidator = (validator: ValidatorStore, nestedValue: AnyValidator | AnyValidatorFunction) => validators.appendValidator(nestedValidator(validator, nestedValue)) 

  let attachNext: boolean = false,
    dynamicPartMap: {[key: number] : number} = {},
    dynamicParts: TextInputPartObjects[] = [],
    localClasses: string[] = $state([]),
    inFocus = $state(false),
    valueParts: {value: any[]} = $state({value: []}),
    lastDynamicPart: TextInputPartObjects 
    
  const expandedMask : InputMask = mask.reduce(maskPartReducer, [])

  const defaultArrayJoiner : ((valueParts: any[], dynamicParts?: any) => any) = (valueParts, dynamicParts) => valueParts[0]

  if (dynamicParts.length > 0
    && typeof splitter === 'function') {
    valueParts = rune(splitter(value, dynamicParts))
  } else {
    if (Array.isArray(value)) {
      valueParts = rune(value)
    } else {
      valueParts = rune([value])
      joiner = joiner ?? defaultArrayJoiner
    }
  }

  if (dynamicParts.length > valueParts.value.length) {
    for (let i = valueParts.value.length; i < dynamicParts.length; i += 1) {
      valueParts.value.push(null)
    }
  }

  $effect(() => {
    const index = localClasses.indexOf('focus')
    if (!inFocus) {
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

  const onFocus = () => inFocus = true
  const onBlur = () => inFocus = false

  const onError = (error) => {
    console.log(error, error.cause)
  }

// $inspect(valueParts)
$inspect(validators.result)

</script>

{#each expandedMask as maskPiece, index}
  {#if typeof maskPiece === 'string'}
    <svealiteral>
      {maskPiece}
    </svealiteral>
  {:else if maskPiece.type === TEXT_DISPLAY_TYPE_LITERAL}
    {#if maskPiece.editor
      && maskPiece.editor.borderless}
      <sveaborderlesscontainer>
        <svealiteral class="borderless">
          {maskPiece.value}
        </svealiteral>
      </sveaborderlesscontainer>
    {:else}
      <svealiteral>
        {maskPiece.value}
      </svealiteral>
    {/if}
  {:else}
    {#if maskPiece.type === TEXT_INPUT_TYPE_NUMBER
      || maskPiece.type === TEXT_INPUT_TYPE_TEXT}
      <TextInput {...maskPiece}
        {...maskPiece.editor}
        data={{...data, index: dynamicPartMap[index]}}
        {onBlur}
        {onChange}
        {onError}
        {onFocus}
        class={[...localClasses, ...maskPiece?.editor?.class ?? []]} 
        bind:value={valueParts.value[dynamicPartMap[index]]} />
    {/if}
  {/if}
{/each}