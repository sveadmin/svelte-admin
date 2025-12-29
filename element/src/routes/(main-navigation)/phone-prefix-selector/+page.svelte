<script lang="ts">
  import {
    SIZE_EXTRA_LARGE,
  } from '$lib/types.js'
  
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    getDisplayValueValueOnly,
  } from '$lib/dropdown-search/index.js'

  import {
    phonePrefixOptions as defaultPhonePrefixOptions,
    PhonePrefixSelector
   } from '$lib/phone-prefix-selector/index.js'

  const phonePrefixOptions = defaultPhonePrefixOptions.filter(value => ['+1', '+44', '+49', '+34'].indexOf(value.value) > -1)

</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default phone prefix selector
    </span>
    <span class="grid-span-6">
      <PhonePrefixSelector isSuggestionListPinnable={true}/>
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Default country selector with options aligned on top
    </span>
    <span class="grid-span-6">
      <PhonePrefixSelector topOptions={['+1-CA', '+1-US']}/>
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Limit selection
    </span>
    <span class="grid-span-6">
      <PhonePrefixSelector {phonePrefixOptions} />
    </span>
  </GridLine>
</GridContainer>
<GridContainer>
  <GridLine>
    <span class="grid-span-4">
      Prefix only
    </span>
    <span class="grid-span-2">
      <PhonePrefixSelector {phonePrefixOptions} getDisplayValue={getDisplayValueValueOnly} value="+1-us"/>
    </span>
    <span class="grid-span-3">
      <PhonePrefixSelector {phonePrefixOptions}
         getDisplayValue={getDisplayValueValueOnly}
        size={SIZE_EXTRA_LARGE} />
    </span>
  </GridLine>
</GridContainer>