<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    countryOptions as defaultContryOptions,
  } from '$lib/country-selector/index.js'

  import {
    CountrySelector
  } from '$lib/country-selector/index.js';

  const countryOptions = defaultContryOptions.filter(value => ['FR', 'BE', 'DE', 'ES'].indexOf(value.value) > -1)
</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector
    </span>
    <span class="grid-span-6">
      <CountrySelector isSuggestionListPinnable={true} childrenConfig={{
				0: {
					childrenConfig: {
						1: {
							data: {
								testid: 'children-input'
							}
						}
					}
				}
			}}/>
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector with options aligned on top
    </span>
    <span class="grid-span-6">
      <CountrySelector topOptions={['FR', 'BE']}/>
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Limit selection
    </span>
    <span class="grid-span-6">
      <CountrySelector {countryOptions} isValueClearedOnInit={true} />
    </span>
  </GridLine>
</GridContainer>