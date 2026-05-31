<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'

  import {
    Button,
  } from '$lib/button/index.js'

  import {
    createOptionStore,
  } from '$lib/option/index.js'

  import {
    DropdownSearch,
    getDisplayValueDefault
  } from '$lib/dropdown-search/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    data,
  } from '$lib/dropdown-search/examples/config/options.js'

  const values = createOptionStore(
    data,
    -1,
    true,
    undefined,
    getDisplayValueDefault  
  )

  const childrenConfig = {
    suggestedValues: {
      style: 'max-height: 22em'
    }
  }

</script>

<h2>Dropdown</h2>
<GridContainer>
    <GridLine>
      <h3 class="grid-span-5">Full dropdown</h3>
      <DropdownSearch {childrenConfig}
        class="grid-span-7"
        isSuggestionListPinnable={true}
        {values} />
    </GridLine>
</GridContainer>
