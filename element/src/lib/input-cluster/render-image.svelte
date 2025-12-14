<script module lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    mergeClasses,
    mergeStyles
  } from '$lib/helper/index.js'

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
    class={mergeClasses(localClasses, maskPiece.class)} 
    isBorderVisible={true}
    style={mergeStyles("vertical-align:bottom", maskPiece.style)}
    visibleHeight={(!maskPiece?.size || maskPiece.size === SIZE_MEDIUM) ? '1.125em' : '1.15em'}
    visibleWidth="1.125em" />
{/snippet}