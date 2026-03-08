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
    SveaComponentImage,
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

  const flagMask: SveaComponentImage = $derived({
    display: {
      class: ['fi'],
      icon: getOption?.()?.properties?.flag.toString(),
      iconPrefix: 'fi-',
      isAttachedOnRight: !isInputHidden,
      onClick: toggleFocus,
      size,
      style:"background-size: cover",
      value, //This is needed to trigger reactivity
    },
    type: COMPONENT_IMAGE,
  })

  const inputMask: TextInputPartText = $derived({
    isAttachedOnLeft: true,
    size,
    style: mergeStyles(style, 'width: calc(100% - 5.25em)').join(';'),
    type: TEXT_INPUT_TYPE_TEXT,
    ...passthrough
  })
</script>

{#if isInputHidden}
  <InputCluster mask={[{...flagMask}]} bind:value={value} />
{:else}
  <InputCluster mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if}

