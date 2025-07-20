<script module lang="ts">
  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'
  
  import type {
    InputPartDropdown,
  } from '$lib/dropdown-search/index.js'

  export {
    renderDropdownSearch
  }
</script>

{#snippet renderDropdownSearch(maskPiece: InputPartDropdown, localClasses: string[])}
  <DropdownSearch {...maskPiece}
    {...maskPiece.editor}
    childrenStyle="background-color:transparent"
    class={localClasses}
    isBorderVisible={true}
    style="vertical-align:bottom" />
{/snippet}