<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
  
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'
  
  import {
    Cluster,
  } from '$lib/cluster/index.js'

  import {
    COMPONENT_COUNTRY_SELECTOR,
    countryOptions as defaultContryOptions,
    CountrySelector,
    renderSuggestionFlag,
  } from '$lib/country-selector/index.js'

  import {
    COMPONENT_TEXT_DISPLAY_WRAPPED,
  } from '$lib/text-display/index.js';

  const countryOptions = defaultContryOptions.filter(value => ['FR', 'BE', 'DE', 'ES'].indexOf(value.value) > -1)

  const components = {
    flag: {
      input: {
        config: {
          countryOptions,
          isAttachedOnRight: true,
        }
      },
      type: COMPONENT_COUNTRY_SELECTOR
    },
    info: {
      display: {
        config: {
          isAttachedOnLeft: true,
          isOutlineVisible: true,
          value: ''
        }
      },
      type: COMPONENT_TEXT_DISPLAY_WRAPPED
    }
  }

</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Flag only
    </span>
    <span>
      <CountrySelector {countryOptions}
        isInputHidden={true}
        renderSuggestion={renderSuggestionFlag}
        value="BE" />
    </span>
    <span class="grid-span-3">
      <CountrySelector {countryOptions}
        isInputHidden={true}
        renderSuggestion={renderSuggestionFlag}
        size={SIZE_EXTRA_LARGE} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-4">
      Using Cluster within cluster
    </span>
    <span class="grid-span-8">
      <Cluster componentConfig={components}
        id="test-cluster"
        mask='$(flag)$(info)'/>
    </span>
  </GridLine>
</GridContainer>