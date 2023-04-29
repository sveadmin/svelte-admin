<script lang="ts">
  import { beforeUpdate } from "svelte";

  export let preview: boolean = true,
    previewFields: string[] = [],
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
      && event.code !== 'Enter') {
      return
    }
    const text: string = window.getSelection().toString()

    if (!text) {
      preview = !preview
    }
  }

  beforeUpdate(() => {
    let valueObject: {}
    try {
      valueObject = JSON.parse(value)
    } catch (error) {
      formatted = formattedPreview = ''
      return
    }

    formatted = formatJson(valueObject)
    if (previewFields.length === 0) {
      formattedPreview = formatted
    } else {
      const previewObject: {} = previewFields.reduce(
        (aggregator, property) => {
          aggregator[property] = valueObject[property]
          return aggregator
        },
        {}
      )
      formattedPreview = formatJson(previewObject)
    }
  })

</script>
<pre on:click={changePreview} on:keyup={changePreview} class:preview={preview}>
  {#if preview}
    {formattedPreview}
  {:else}
    {formatted}
  {/if}
</pre>
