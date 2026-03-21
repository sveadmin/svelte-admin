<script lang="ts">
  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js';

  import {
    mergeStyles,
    propertyMerger,
  } from '$lib/helper/index.js'

  import {
    COMPONENT_IMAGE,
  } from '$lib/image/index.js'

  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import type {
    TextInputPartText,
  } from '$lib/text-input/index.js'

  import type {
    FlagInputProps,
  } from './types.js'

  let {
    callbacks = {},
    childrenConfig = $bindable({}),
    data,
    isInputHidden = false,
    mask,
    size,
    value = $bindable(),
    ...passthrough
  } : FlagInputProps = $props()

  const {
    toggleFocus,
  } = callbacks

  const flagConfig = $derived({
    display: propertyMerger(
      childrenConfig?.flag,
      childrenConfig?.[0],
      {
        class: ['fi'],
        icon: data?.key?.toString().toLowerCase(),
        iconPrefix: 'fi-',
        isAttachedOnRight: !isInputHidden,
        onClick: toggleFocus,
        size,
        style:"background-size: cover",
      }
    ),
    type: COMPONENT_IMAGE,
  })

  const inputConfig = $derived({
    display: propertyMerger(
      childrenConfig?.input,
      childrenConfig?.[1],
      passthrough,
      {
        isAttachedOnLeft: true,
        size,
        style: 'width: calc(100% - 5.25em)'
      }
    ),
    type: TEXT_INPUT_TYPE_TEXT,
  })

  let extendedMask = $derived(mask ?? '$(flag)' + ((isInputHidden) ? '' : '$(input)')),
    configParsed = $derived({
    flag: flagConfig,
    input: inputConfig
  })

</script>

<Cluster {data} childrenConfig={configParsed} mask={extendedMask} bind:value={value} />
<!-- 
{#if isInputHidden}
  <Cluster {data} childrenConfig={configParsed} mask={[{...flagMask}]} bind:value={value} />
{:else}
  <Cluster {data} mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if} -->

