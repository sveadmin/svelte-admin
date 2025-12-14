<script module lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'
  
  import type {
    ButtonProps,
  } from '$lib/button/index.js'

  import {
    mergeClasses,
  } from '$lib/helper/index.js'

  export {
    renderButton
  }
</script>

{#snippet renderButton(maskPiece: ButtonProps, localClasses: string[])}
  <Button {...maskPiece}
    class={mergeClasses(localClasses, maskPiece.class)} 
    isBorderVisible={true} />
{/snippet}