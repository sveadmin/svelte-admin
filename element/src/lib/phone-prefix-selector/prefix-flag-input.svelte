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
    COMPONENT_IMAGE_WRAPPED,
  } from '$lib/image/index.js'

  import type {
    ComponentImageWrapped,
  } from '$lib/image/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

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

  const flagMask: ComponentImageWrapped = $derived({
    display: {
      config: {
        class: ['fi'],
        icon: getOption?.()?.properties?.flag.toString(),
        iconPrefix: 'fi-',
        isAttachedOnRight: !isInputHidden,
        onClick: toggleFocus,
        size,
        style:"background-size: cover",
        value, //This is needed to trigger reactivity
      }
    },
    type: COMPONENT_IMAGE_WRAPPED,
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
  <Cluster mask={[{...flagMask}]} bind:value={value} />
{:else}
  <Cluster mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if}

