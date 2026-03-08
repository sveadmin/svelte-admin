<script module lang="ts">
  import type {
    LiteralDisplayProps,
  } from '$lib/literal/index.js'

  export {
    renderLiteral
  }
</script>

{#snippet renderLiteral(maskPiece: LiteralDisplayProps)}
  {#if maskPiece
    && maskPiece.borderless}
    <sveaborderlesscontainer data-size={maskPiece?.size}>
      <svealiteral class="borderless" data-size={maskPiece?.size}>
        {maskPiece?.value}
      </svealiteral>
    </sveaborderlesscontainer>
  {:else}
    <svealiteral data-size={maskPiece?.size}>
      {maskPiece?.value}
    </svealiteral>
  {/if}
{/snippet}