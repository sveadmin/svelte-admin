<script lang="ts">
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
<h3>Add value (ID matches will be overwritten)</h3>
ID: <input type="text" bind:value={newId}>
Label: <input type="text" bind:value={newLabel}>
<input type="submit" onclick={addNewItem}>
<input type="submit" onclick={() => classStore.push('class22222')} value="add class">
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
  <h3>This will NOT be focused, as there is a later dropdown with setFocus = true</h3>
  <DropdownSearch {values} setFocus={true}/>
  <h3>Normal, clear value on focusing the input</h3>
  <DropdownSearch {values} clearValueOnInit={true} value="4"/>
  <h3>Helpers are flipped (dropdown list on top, current value at bottom)</h3>
  <DropdownSearch {values} areHelpersFlipped={true} value="20"/>
  <h3>Helpers disabled (matches the ID of the item)</h3>
  <DropdownSearch {values} areHelpersVisible={false} value="12"/>
  <h3>This will be focused</h3>
  <DropdownSearch {values} setFocus={true}/>
</list>