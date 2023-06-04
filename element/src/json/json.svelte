<script lang="ts">
  import { beforeUpdate } from "svelte";

  import {
    AllowedJsonDisplayMode,
    DISPLAY_JSON_FILTERED,
    DISPLAY_JSON_FULL,
  } from './types.js'

  export let displayMode: AllowedJsonDisplayMode = DISPLAY_JSON_FILTERED,
    fields: string[] = [],
    value: string

  let formatted: string = '',
    formattedPreview: string = '' 

  function formatJson(jsonObject: {}) {
    return JSON.stringify(jsonObject, (key, value) => (value || ''), 2)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/^{\n\s*/g, '')
      .replace(/\n\s{2}/g, '\n')
      .replace(/\n}$/g, '')
  }

  const changePreview = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    const text: string = window.getSelection().toString()

    if (!text) {
      displayMode = (displayMode === DISPLAY_JSON_FILTERED)
        ? DISPLAY_JSON_FULL
        : DISPLAY_JSON_FILTERED
    }
  }

  beforeUpdate(() => {
    let valueObject: {}
  console.log('JOSNBU', value, JSON.parse(value))
    try {
      valueObject = JSON.parse(value)
    } catch (error) {
      formatted = formattedPreview = ''
      return
    }

    formatted = formatJson(valueObject)
    if (fields.length === 0) {
      formattedPreview = formatted
    } else {
      const previewObject: {} = fields.reduce(
        (aggregator, property) => {
          aggregator[property] = valueObject[property]
          return aggregator
        },
        {}
      )
      formattedPreview = formatJson(previewObject)
    }
  })
console.log('JSONINF', value)

</script>
<pre on:click={changePreview} on:keyup={changePreview} class:preview={displayMode === DISPLAY_JSON_FILTERED}>
  {#if displayMode === DISPLAY_JSON_FILTERED}
    {formattedPreview}
  {:else}
    {formatted}
  {/if}
</pre>
