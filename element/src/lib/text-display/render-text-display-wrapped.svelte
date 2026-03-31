<script module lang="ts">
  import {
    mergeClasses,
  } from '$lib/helper/index.js'

  import {
    TextDisplayWrapped,
  } from '$lib/text-display/index.js'

  import type {
    TextDisplayWrappedProps,
  } from '$lib/text-display/index.js'

  export {
    renderTextDisplayWrapped
  }
</script>

{#snippet renderTextDisplayWrapped(options: TextDisplayWrappedProps, localClasses: string[])}
  <TextDisplayWrapped {...options} class={mergeClasses(localClasses, options.class)}/>
{/snippet}