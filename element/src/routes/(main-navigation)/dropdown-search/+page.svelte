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
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  // import './dropdown-search.css'

  import {
    values,
  } from './options.js'

  let boundValue = $state(2),
    newLabel = $state(''),
    newValue = $state('')

  const addNewItem = () => {
    if (newValue !== ''
      && newLabel !== '') {
      values.add({
        label: newLabel,
        value: newValue
      })
      newLabel = ''
      newValue = ''
    }
  }
</script>
<h2>Dropdown</h2>
<GridContainer>
  <GridLine style="align-items: baseline">
    <div class="grid-span-9">
      <GridContainer>
        <GridLine>
          <h3 class="grid-span-5">Normal</h3>
          <DropdownSearch {values} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Small</h3>
          <DropdownSearch {values} size={SIZE_SMALL} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Large</h3>
          <DropdownSearch {values} size={SIZE_LARGE} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Extra large</h3>
          <DropdownSearch {values} size={SIZE_EXTRA_LARGE} class="grid-span-7" 
          isSuggestionListPinnable={true}/>
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Normal with built in error display</h3>
          <DropdownSearch {values} areErrorsVisible={true} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Normal without bound value - `{boundValue}`</h3>
          <DropdownSearch {values} bind:value={boundValue} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Normal, empty is not allowed</h3>
          <DropdownSearch {values} isEmptyAllowed={false} value="5" class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Normal, new value is allowed</h3>
          <DropdownSearch {values} isNewValueAllowed={true} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">This will NOT be focused, as there is a later dropdown with autoFocus = true</h3>
          <DropdownSearch {values} autoFocus={true} class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Normal, clear value on focusing the input</h3>
          <DropdownSearch {values} clearValueOnInit={true} value="4" class="grid-span-7" />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Helpers are flipped (dropdown list on top, current value at bottom)</h3>
          <DropdownSearch class="grid-span-7"
            isSuggestionListOnTop={true}
          isSuggestionListPinnable={true}
            value="20"
            {values} />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">Helpers disabled (matches the ID of the item)</h3>
          <DropdownSearch class="grid-span-7"
            isCurrentValueVisible={false}
            isSuggestionListVisible={false}
            value="12" 
            {values} />
        </GridLine>
        <GridLine>
          <h3 class="grid-span-5">This will be focused</h3>
          <DropdownSearch {values} autoFocus={true} class="grid-span-7"/>
        </GridLine>
      </GridContainer>
      <list>

      </list>
    </div>
    <div class="grid-span-3">
      <h3>Add option</h3>
      <h5>(Value matches will be overwritten)</h5>
      Value: <input type="text" bind:value={newValue}>
      Label: <input type="text" bind:value={newLabel}>
      <input type="submit" onclick={addNewItem}>
      <h3>Values</h3>
      {#each values.options as option}
        <h5>{option.value} - {option.label}</h5>
        <span>{JSON.stringify(option.properties)}</span>
      {/each}
    </div>
  </GridLine>
</GridContainer>

<style>
  h5 {
    margin-bottom: 0;
  }

  h5 + span {
    margin-left: 1rem;
  }
</style>