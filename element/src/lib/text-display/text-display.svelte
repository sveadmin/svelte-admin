<script lang="ts">
  import type {
    TextDisplayProps,
  } from './types.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
  } from './types.js'

  import {
    parseValue,
  } from './helper/index.js'

  let {
    mask = $bindable([{type: TEXT_DISPLAY_TYPE_TEXT}]),
    splitter,
    value = $bindable(''),
  } : TextDisplayProps = $props()

  let displayValue = $state('')

  $effect(() => {
    displayValue = parseValue(
      mask,
      value,
      splitter
    )
  })
</script>

{displayValue}