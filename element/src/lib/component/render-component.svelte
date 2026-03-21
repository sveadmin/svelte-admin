<script module lang="ts">
  import type {
    Component,
  } from 'svelte'

  import type {
    SveadminElementConfig,
  } from '$lib/types.js'

  export {
    renderComponent
  }
</script>

{#snippet renderComponent(
  Component: Component,
  options: SveadminElementConfig,
)}
  <Component {...options} />
{/snippet}