<script module lang="ts">
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

{#snippet renderTextDisplayWrapped(maskPiece: TextDisplayWrappedProps)}
  <TextDisplayWrapped isFloating={maskPiece?.isFloating}
    isAttachedOnLeft={maskPiece?.isAttachedOnLeft}
    isAttachedOnRight={maskPiece?.isAttachedOnRight}
    size={maskPiece?.size}
    value={maskPiece?.value} />
{/snippet}