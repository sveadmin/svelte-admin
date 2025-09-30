<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    countryConfigGenerator,
    countryOptions as defaultContryOptions,
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  const countryOptions = defaultContryOptions.filter(value => ['FR', 'BE', 'DE', 'ES'].indexOf(value.value) > -1)

</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector
    </span>
    <span class="grid-span-6">
      <DropdownSearch {...countryConfigGenerator()} />
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector with options aligned on top
    </span>
    <span class="grid-span-6">
      <DropdownSearch {...countryConfigGenerator(undefined, ['FR', 'BE'])} />
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Limit selection
    </span>
    <span class="grid-span-6">
      <DropdownSearch {...countryConfigGenerator(countryOptions)} />
    </span>
  </GridLine>
</GridContainer>