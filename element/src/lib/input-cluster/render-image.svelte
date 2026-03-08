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
    ImageWrappedProps,
  } from '$lib/image/index.js'

  export {
    renderImage
  }
</script>

{#snippet renderImage(maskPiece: ImageWrappedProps, localClasses: string[])}
  <ImageWrapped {...maskPiece}
    class={mergeClasses(localClasses, maskPiece.class)} 
    isBorderVisible={true}
    style={mergeStyles(maskPiece.style, "vertical-align:bottom")}
    visibleHeight={(!maskPiece?.size || maskPiece.size === SIZE_MEDIUM) ? '1.125em' : '1.15em'}
    visibleWidth="1.125em" />
{/snippet}