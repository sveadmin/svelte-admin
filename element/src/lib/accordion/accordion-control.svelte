<script module lang="ts">
  import {
    ImageWrapped,
  } from '$lib/image/index.js'

  import type {
    ImageWrappedDisplayProps,
  } from '$lib/image/index.js'

  export {
    renderAccordionControl
  }
</script>

{#snippet renderAccordionControl(
  options?: ImageWrappedDisplayProps,
)}
  <ImageWrapped {...options} />
{/snippet}
