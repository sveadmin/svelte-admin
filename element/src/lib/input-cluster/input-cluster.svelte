<script lang="ts">
  import {
    TEXT_INPUT_TYPE_NUMBER,
    TEXT_INPUT_TYPE_PASSWORD,
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
    joiner,
    mask,
    splitter,
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

  let attachNext: boolean = false,
    dynamicPartMap: {[key: number] : number} = {},
    dynamicParts: TextInputPartObjects[] = [],
    localClasses: string[] = $state([]),
    inFocus = $state(false),
    valueParts: any[] = $state([]),
    lastDynamicPart: TextInputPartObjects 
    
  const expandedMask : InputMask = mask.reduce(maskPartReducer, [])

  if (dynamicParts.length > 0
    && typeof splitter === 'function') {
    valueParts = splitter(value, dynamicParts)
  } else {
    if (Array.isArray(value)) {
      valueParts = value
    } else {
      valueParts = [value]
      joiner = (valueParts: any[]) => valueParts[0]
    }
  }

  if (dynamicParts.length > valueParts.length) {
    for (let i = valueParts.length; i < dynamicParts.length; i += 1) {
      valueParts.push(null)
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
      ? joiner(valueParts, dynamicParts)
      : valueParts
  })

  const onFocus = () => inFocus = true
  const onBlur = () => inFocus = false

$inspect(valueParts)

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
    {#if maskPiece.type === TEXT_INPUT_TYPE_NUMBER}
      <TextInput {...maskPiece}
        {...maskPiece.editor}
        {onFocus}
        {onBlur}
        class={[...localClasses, ...maskPiece?.editor?.class ?? []]} 
        bind:value={valueParts[dynamicPartMap[index]]} />
    {/if}
  {/if}
{/each}