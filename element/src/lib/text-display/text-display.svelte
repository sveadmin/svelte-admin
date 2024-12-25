<script lang="ts">
  import type {
    TextDisplayProps,
    TextDisplayMask,
  } from './types.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
  } from './types.js'

  import {
    prepareParseValue,
  } from './helper/index.js'


  let {
    dateTimeDefinitions,
    mask = $bindable([{type: TEXT_DISPLAY_TYPE_TEXT}]),
    splitter,
    value = $bindable(''),
  } : TextDisplayProps = $props()

  let parseValue: (
    mask: TextDisplayMask | string,
    value: any,
  ) => string = $state((
    mask: TextDisplayMask | string,
    value: any,
  ) => '')
  
  async function loadParseValue() {
    parseValue = await prepareParseValue(dateTimeDefinitions, splitter)
  }

  let displayValue = $state('')

  $effect(() => {
    displayValue = parseValue(
      mask,
      value
    )
  })
  loadParseValue()
</script>

{displayValue}