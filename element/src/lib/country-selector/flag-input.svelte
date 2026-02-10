<script lang="ts">
  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js';

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
    style = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : FlagInputProps = $props()

  const {
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
    ...childrenConfig?.[0],
    ...childrenConfig?.flag
  })

  const inputMask: TextInputPartText = $state({
    isAttachedOnLeft: true,
    size,
    type: TEXT_INPUT_TYPE_TEXT,
    ...passthrough,
    ...childrenConfig?.[1],
    ...childrenConfig?.input
  })

  let extendedMask = $derived(mask || '$(flag)' + (isInputHidden) ? '' : '$(input)'),
    configParsed = $derived({
    flag: flagMask,
    input: inputMask
  })

  $effect(() => {
    flagMask.icon = data?.key?.toString().toLowerCase()
  })

  $effect(() => {
    inputMask.style = mergeStyles(style, 'width: calc(100% - 5.25em)').join(';')
  })

  $inspect('falg input data', childrenConfig)
</script>

<InputCluster {data} childrenConfig={configParsed} mask={extendedMask} bind:value={value} />
<!-- 
{#if isInputHidden}
  <InputCluster {data} childrenConfig={configParsed} mask={[{...flagMask}]} bind:value={value} />
{:else}
  <InputCluster {data} mask={[{...flagMask}, {...inputMask}]} bind:value={value} />
{/if} -->

