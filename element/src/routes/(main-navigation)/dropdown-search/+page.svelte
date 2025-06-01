<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import './dropdown-search.css'

  import {
    values,
  } from './options.js'

  let boundValue = $state(2),
    newId = $state(''),
    newLabel = $state('')

  const addNewItem = () => {
    if (newId !== ''
      && newLabel !== '') {
      values.add({
        id: newId,
        value: newLabel
      })
      newId = ''
      newLabel = ''
    }
  }

  const classStore = $state(['class1'])
</script>
<h2>Dropdown</h2>
<GridContainer>
  <GridLine style="align-items: baseline">
    <div class="grid-span-9">
      <list>
        <h3>Normal</h3>
        <DropdownSearch {values} {classStore}/>
        <h3>Normal with built in error display</h3>
        <DropdownSearch {values} areErrorsVisible={true} />
        <h3>Normal without bound value - `{boundValue}`</h3>
        <DropdownSearch {values} bind:value={boundValue}/>
        <h3>Normal, empty is not allowed</h3>
        <DropdownSearch {values} isEmptyAllowed={false} value="5"/>
        <h3>Normal, new value is allowed</h3>
        <DropdownSearch {values} isNewValueAllowed={true}/>
        <h3>This will NOT be focused, as there is a later dropdown with autoFocus = true</h3>
        <DropdownSearch {values} autoFocus={false}/>
        <h3>Normal, clear value on focusing the input</h3>
        <DropdownSearch {values} clearValueOnInit={true} value="4"/>
        <h3>Helpers are flipped (dropdown list on top, current value at bottom)</h3>
        <DropdownSearch {values} areHelpersFlipped={true} value="20"/>
        <h3>Helpers disabled (matches the ID of the item)</h3>
        <DropdownSearch {values} areHelpersVisible={false} value="12"/>
        <h3>This will be focused</h3>
        <DropdownSearch {values} autoFocus={true}/>
      </list>
    </div>
    <div class="grid-span-3">
      <h3>Add value</h3>
      <h5>(ID matches will be overwritten)</h5>
      ID: <input type="text" bind:value={newId}>
      Label: <input type="text" bind:value={newLabel}>
      <input type="submit" onclick={addNewItem}>
      <h3>Values</h3>
      {#each values.options as option}
        <h5>{option.id} - {option.value}</h5>
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