<script module lang="ts">
  export {
    renderCheckboxLabel
  }

  import {
    Image
  } from '$lib/image/index.js'

  import checkMark from './assets/check-mark.svg'
</script>

{#snippet renderCheckboxLabel(value: boolean)}
  {#if value}
    <Image class="checkboxLabelIcon"
      src={checkMark} />
  {/if}
{/snippet}
