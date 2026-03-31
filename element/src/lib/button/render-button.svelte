<script module lang="ts">
  import {
    mergeClasses,
  } from '$lib/helper/index.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Button from './button.svelte'
  
  import type {
    ButtonInputProps,
  } from './types.js'

  export {
    renderButton
  }
</script>

{#snippet renderButton(maskPiece: ButtonInputProps, localClasses: string[])}
  <Button {...maskPiece}
    class={mergeClasses(localClasses, maskPiece.class)} 
    isBorderVisible={true} />
{/snippet}