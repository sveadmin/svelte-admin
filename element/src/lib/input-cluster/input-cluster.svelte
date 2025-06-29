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
    COMPONENT_IMAGE,
    ImageWrapped,
  } from '$lib/image/index.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
  } from '$lib/literal/index.js'

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
    prepareMaskPartReducer,
  } from './helper/index.js'

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

  let dynamicPartMap: {[key: number] : number} = {},
    dynamicParts: TextInputPartObjects[] = [],
    localClasses: string[] = $state([]),
    inFocus = $state(false),
    valueParts: {value: any[]} = $state({value: []})

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

  const maskPartReducer = prepareMaskPartReducer(dynamicParts, dynamicPartMap)
  const expandedMask : InputMask = mask.reduce(maskPartReducer, [])

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

  const onError = (error: Error) => {
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
  {:else if maskPiece.type === COMPONENT_IMAGE}
    <ImageWrapped {...maskPiece}
      {...maskPiece.editor}
      class={[...localClasses, ...maskPiece?.editor?.class ?? []]} 
      isBorderVisible={true}
      style="vertical-align:bottom;font-size:1rem;padding:var(--padding-l)"
      visibleHeight="1.125em"
      visibleWidth="1.125em" />
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