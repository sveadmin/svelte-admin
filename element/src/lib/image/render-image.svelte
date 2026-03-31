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
    ImageWrappedDisplayProps,
  } from '$lib/image/index.js'

  export {
    renderImage
  }
</script>

{#snippet renderImage(options: ImageWrappedDisplayProps, localClasses: string[])}
  <ImageWrapped {...options}
    class={mergeClasses(localClasses, options.class)} 
    isBorderVisible={true}
    style={mergeStyles(options.style, "vertical-align:top")}
    visibleHeight={(!options?.size || options.size === SIZE_MEDIUM) ? '1.125em' : '1.15em'}
    visibleWidth="1.125em" />
{/snippet}