<script lang="ts">
  import {
    CountrySelector,
  } from '$lib/country-selector/index.js'

  import {
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Input,
    InputWrapped,
  } from '$lib/input/index.js'

  import {
    formattedLabel,
  } from './formatted-label.svelte'

  import {
    inputElement,
  } from './input-element.svelte'

</script>

<GridLine>
  <Input label="Input using nested field" class="grid-span-4" labelClass="grid-span-6">
    <CountrySelector isSuggestionListPinnable={true}/>
  </Input>
</GridLine>

<GridLine>
  <InputWrapped label="Input wrapped using nested field" class="grid-span-4" labelClass="grid-span-6">
    <CountrySelector isSuggestionListPinnable={true}/>
  </InputWrapped>
</GridLine>

