<script module lang="ts">
  import {
    Input,
  } from '$lib/input/index.js'

  import type {
    InputProps,
  } from '$lib/input/index.js'

  export {
    inputElement
  }
</script>

{#snippet inputElement(properties: InputProps)}
  <Input
    {...properties}
    style="border-style:dotted;"
    value={properties.value || "Default value from the Snippet"} />
{/snippet}