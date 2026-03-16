<script module lang="ts">
  import {
    LiteralWrapped,
  } from '$lib/literal/index.js'

  import type {
    LiteralDisplayWrappedProps,
  } from '$lib/literal/index.js'

  export {
    renderLiteralWrapped
  }
</script>

{#snippet renderLiteralWrapped(maskPiece: LiteralDisplayWrappedProps)}
  <LiteralWrapped isFloating={maskPiece?.isFloating}
    isAttachedOnLeft={maskPiece?.isAttachedOnLeft}
    isAttachedOnRight={maskPiece?.isAttachedOnRight}
    size={maskPiece?.size}
    value={maskPiece?.value} />
{/snippet}