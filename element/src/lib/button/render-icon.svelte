<script module lang="ts">
  import type {
    Icon,
  } from '$lib/types.js'
  
  import {
    ImageWrapped,
  } from '$lib/image/index.js'

  import type {
    ImageWrappedDisplayProps,
  } from '$lib/image/index.js'

  export {
    defaultRenderIcon
  }
</script>

{#snippet defaultRenderIcon(icons: Icon[], properties?: ImageWrappedDisplayProps)}
  {#each icons as icon}
    <ImageWrapped {...icon} {...properties} />
  {/each}
{/snippet}