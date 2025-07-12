<script module lang="ts">
  import {
    Button,
  } from '$lib/button/index.js'
  
  import type {
    ButtonProps,
  } from '$lib/button/index.js'

  export {
    renderButton
  }
</script>

{#snippet renderButton(maskPiece: ButtonProps, localClasses: string[])}
  <Button {...maskPiece}
    class={[...localClasses, ...maskPiece?.class ?? []]} 
    isBorderVisible={true} />
{/snippet}