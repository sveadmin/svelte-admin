<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
    SIZE_LARGE,
    SIZE_SMALL,
  } from '$lib/types.js'


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
  <GridLine>
    <span class="grid-span-4">
      Default country selector small
    </span>
    <span class="grid-span-6">
      <CountrySelector isSuggestionListPinnable={true} size={SIZE_SMALL} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">
      Default country selector large
    </span>
    <span class="grid-span-6">
      <CountrySelector isSuggestionListPinnable={true} size={SIZE_LARGE} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">
      Default country selector extra large
    </span>
    <span class="grid-span-6">
      <CountrySelector isSuggestionListPinnable={true} size={SIZE_EXTRA_LARGE} />
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector with options aligned on top
    </span>
    <span class="grid-span-6">
      <CountrySelector topOptions={['fr', 'be']}/>
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