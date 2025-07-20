<script module lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    ImageWrapped,
  } from '$lib/image/index.js'
  
  import type {
    InputPartImage,
  } from '$lib/image/index.js'

  export {
    renderImage
  }
</script>

{#snippet renderImage(maskPiece: InputPartImage, localClasses: string[])}
  <ImageWrapped {...maskPiece}
    {...maskPiece.editor}
    class={localClasses} 
    isBorderVisible={true}
    style="vertical-align:bottom"
    visibleHeight={(!maskPiece?.size || maskPiece.size === SIZE_MEDIUM) ? '1.125em' : '1.15em'}
    visibleWidth="1.125em" />
{/snippet}