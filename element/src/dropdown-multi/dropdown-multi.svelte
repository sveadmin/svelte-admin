<script lang="ts">
  import { beforeUpdate, onMount, createEventDispatcher } from 'svelte'

  import {
    generateLookupOrder,
    generateLookupValues,
  } from './helper/index.js'

  import type {
    LookupItem,
    SelectedItems,
    SelectionGetter,
    SelectionItem,
    ValueGetter
  } from './types.js'

  const dispatch = createEventDispatcher();

  export let getSelection:SelectionGetter = () => {return {}},
    getValues:ValueGetter = () => values,
    values:Array<SelectionItem> = []
  
  let filteredValues: Array<SelectionItem>,
    idLookup: {[key: string]: string} = {},
    lookupOrder: Array<LookupItem> = [],
    selection: SelectedItems = {},
    selectionCount:number = 0;

  const selectAll = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    filteredValues.map((value) => selection[value.id] = true)
  }

  const selectNone = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    filteredValues.map((value) => selection[value.id] = false)
  }

  const filterList = (needle:string) => {
    if (needle === '') {
      return values
    }

    const valueList = getValues()

    return [
      valueList.find((v) => v.id == needle),
      ...valueList.filter((v) => v.value.toLowerCase().indexOf(needle) >= 0
                              && v.id != needle)
    ]
  }

  const onKeyUp = (event: Event) => {
    const target = event.target as HTMLInputElement;
    filteredValues = filterList(target.value.toLowerCase()) ?? []
    idLookup = generateLookupValues(filteredValues)
    lookupOrder = generateLookupOrder(filteredValues)
  }

  const submit = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    dispatch('submit', selection);
  }

  beforeUpdate(() => {
    selectionCount = 
      (!selection)
        ? -1
        : Object.entries(selection)
            .filter((v) => v[1])
            .length
  })

  onMount(() => {
    selection = getSelection()
    values = getValues()
    filteredValues = getValues()
    idLookup = generateLookupValues(filteredValues)
    lookupOrder = generateLookupOrder(filteredValues)
  })

</script>

<sveamodalcontainer>
  <div class="modal">
    <h2>Select values</h2>
    <input on:keyup="{onKeyUp}">
    <sveapossiblevalues>
      {#each lookupOrder as value}
        <sveapossiblevalue>
          <input
            id="value{idLookup[value.term]}"
            type="checkbox"
            bind:checked={selection[idLookup[value.term]]}
          >
          <label for="value{idLookup[value.term]}" data-label="{idLookup[value.term]} - {value.display}"></label>
        </sveapossiblevalue>
      {/each}
    </sveapossiblevalues>
    <sveaactionbar>
      <sveagenericaction class="smallButton" on:click={selectAll} on:keyup={selectAll}>+ All</sveagenericaction>
      <sveagenericaction class="smallButton" on:click={selectNone} on:keyup={selectNone}>- All</sveagenericaction>
    </sveaactionbar>
    <div class="submit" on:click="{submit}" on:keyup={submit}>Select</div>
    <center>{selectionCount} selected</center>
  </div>
</sveamodalcontainer>

<style global src="./dropdown-multi.css"></style>
