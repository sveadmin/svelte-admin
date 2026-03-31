<script module lang="ts">
  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'
  
  import type {
    DropdownSearchInputProps,
  } from '$lib/dropdown-search/index.js'

  export {
    renderDropdownSearch
  }
</script>

{#snippet renderDropdownSearch(
  options: DropdownSearchInputProps,
  localClasses: string[],
)}
  <DropdownSearch {...options}
    childrenStyle="background-color:transparent"
    class={localClasses}
    isBorderVisible={true} />
{/snippet}