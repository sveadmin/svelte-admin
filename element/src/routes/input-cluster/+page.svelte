<script lang="ts">
  import {
    TEXT_INPUT_TYPE_NUMBER,
  } from '$lib/types.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
  } from '$lib/literal/types.js'

  import {
    InputCluster,
  } from '$lib/input-cluster/index.js'

  import type {
    InputClusterParts,
  } from '$lib/input-cluster/index.js'

  const mask1: InputClusterParts[] = [
    'test',
    {
      editor: {
        visibleWidth: '3rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        visibleWidth: '2rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        visibleWidth: '2rem',
      },
      type: TEXT_INPUT_TYPE_NUMBER,
    }
  ]

  let boundValue = $state([2020, 1, 2])
</script>

<InputCluster mask={mask1} bind:value={boundValue}/>
{JSON.stringify(boundValue)}