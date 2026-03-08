<script module lang="ts">
  import type {
    ValidatorStore
  } from '@sveadmin/common'

  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'
  
  import type {
    SveaComponentDropdown,
  } from '$lib/dropdown-search/index.js'

  export {
    renderDropdownSearch
  }
</script>

{#snippet renderDropdownSearch(
  maskPiece: SveaComponentDropdown,
  localClasses: string[],
  validators?: ValidatorStore,  
)}
  <DropdownSearch {...maskPiece?.input?.config}
    childrenStyle="background-color:transparent"
    class={localClasses}
    isBorderVisible={true}
    style="vertical-align:bottom"
    {validators} />
{/snippet}