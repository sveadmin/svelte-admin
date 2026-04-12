<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    SIZE_SMALL,
    SIZE_LARGE,
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'

  import {
    monthSelectorTwoDigitGenerator,
    yearGenerator,
  } from '$lib/date-selector/index.js'

  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  const monthConfig = monthSelectorTwoDigitGenerator({data: {testid: 'month-selector'}})
  const yearConfig = yearGenerator({data: {testid: 'year-selector'}})
</script>

<h2>Date Dropdown</h2>
<GridContainer class="demopage-grid">
  <form>
    <GridLine>
      <span class="grid-span-3">Quick month dropdown:</span>
      <span class="grid-span-9" data-testid="first-cluster">
        <DropdownSearch {...monthConfig.input?.config} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-3">Quick year dropdown:</span>
      <span class="grid-span-9 grid-start-4">
        <DropdownSearch {...yearConfig.input?.config} />
      </span>
    </GridLine>
  </form>
</GridContainer>