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

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    TextInputProps,
  } from '$lib/text-input/index.js'

  let {
    data,
    style = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : TextInputProps = $props()

  let styles = $derived(mergeStyles(style, 'width: calc(100% - 5.25em)'))
$inspect('Flag input', value)
</script>

<InputCluster mask={
  [
    {
      class: ['fi'],
      icon: data?.value,
      iconPrefix: 'fi-',
      isAttachedOnRight: true,
      style:"background-size: cover",
      type: COMPONENT_IMAGE,
    },
    {
      isAttachedOnLeft: true,
      style: styles.join(';'),
      type: TEXT_INPUT_TYPE_TEXT,
      ...passthrough
    }
  ]}
  bind:value={value} />

