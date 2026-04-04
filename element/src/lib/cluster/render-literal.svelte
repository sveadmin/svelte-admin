<script module lang="ts">
  import {
    Literal,
  } from '$lib/literal/index.js'

  import type {
    LiteralDisplayProps,
  } from '$lib/literal/index.js'

  export {
    renderLiteral
  }
</script>

{#snippet renderLiteral(maskPiece: LiteralDisplayProps)}
  <Literal {...maskPiece} />
{/snippet}