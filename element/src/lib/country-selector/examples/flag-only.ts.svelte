<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
  
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    countryOptions as defaultContryOptions,
    renderSuggestionFlag,
  } from '$lib/country-selector/index.js'

  import {
    CountrySelector
   } from '$lib/country-selector/index.js';

  const countryOptions = defaultContryOptions.filter(value => ['FR', 'BE', 'DE', 'ES'].indexOf(value.value) > -1)

</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Flag only
    </span>
    <span>
      <CountrySelector {countryOptions} renderSuggestion={renderSuggestionFlag} value="BE"/>
    </span>
    <span class="grid-span-3">
      <CountrySelector {countryOptions}
        renderSuggestion={renderSuggestionFlag}
        size={SIZE_EXTRA_LARGE} />
    </span>
  </GridLine>
</GridContainer>