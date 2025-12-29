<script lang="ts">
  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js';

  import type {
    CountrySelectorProps,
  } from '$lib/country-selector/index.js'

  import {
    mergeStyles,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_IMAGE,
  } from '$lib/image/index.js'

  import type {
    InputPartImage,
  } from '$lib/image/index.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    TextInputPartText,
  } from '$lib/text-input/index.js'


  let {
    callbacks = {},
    data,
    isInputHidden = false,
    size,
    style = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : CountrySelectorProps = $props()

  const {
    getOption,
    toggleFocus,
  } = callbacks

  const flagMask: InputPartImage = $state({
    class: ['fi'],
    iconPrefix: 'fi-',
    isAttachedOnRight: !isInputHidden,
    onClick: toggleFocus,
    size,
    style:"background-size: cover",
    type: COMPONENT_IMAGE,
  })

  const inputMask: TextInputPartText = $state({
    isAttachedOnLeft: true,
    size,
    type: TEXT_INPUT_TYPE_TEXT,
    ...passthrough
  })

  $effect(() => {
    const value = data?.value //This is needed to trigger reactivity
    flagMask.icon = getOption?.()?.properties?.flag.toString()
  })

  $effect(() => {
    inputMask.style = mergeStyles(style, 'width: calc(100% - 5.25em)').join(';')
  })

</script>

{#if isInputHidden}
  <InputCluster mask={[{...flagMask}]} bind:value={value} />
{:else}
  <InputCluster mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if}

