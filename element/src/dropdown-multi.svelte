<script lang="ts">
  type Item = {
    id: string,
    value: string
  };
  interface SelectionGetter {
    (): {[key: string]: boolean}
  }
  interface ValueGetter {
    (): Array<Item>
  }

  import { beforeUpdate, onMount, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher();

  export let getSelection:SelectionGetter = () => {return {}},
    getValues:ValueGetter = () => values,
    values:Array<Item> = []
  let
    selection: {[key: string]: boolean} = {},
    filteredValues: Array<Item>,
    idLookup = {},
    lookupOrder = [],
    selectionCount:number = 0;

  const generateLookupValues = () => {
    lookupOrder = []
    idLookup = filteredValues.reduce((aggregator, value) => {
      if (!value) {
        return aggregator
      }
      lookupOrder.push({
        term: value.value.toLowerCase(),
        display: value.value,
      })
      aggregator[value.value.toLowerCase()] = value.id
      return aggregator
    }, [])
    lookupOrder.sort();
  }

  const selectAll = () => {
    filteredValues.map((value) => selection[value.id] = true)
  }

  const selectNone = () => {
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

  const onKeyUp = (event) => {
    filteredValues = filterList(event.target.value.toLowerCase()) ?? []
    generateLookupValues()
  }

  const onSubmit = (event) => {
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
    generateLookupValues()
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
      <sveagenericaction class="smallButton" on:click={selectAll}>+ All</sveagenericaction>
      <sveagenericaction class="smallButton" on:click={selectNone}>- All</sveagenericaction>
    </sveaactionbar>
    <div class="submit" on:click="{onSubmit}">Select</div>
    <center>{selectionCount} selected</center>
  </div>
</sveamodalcontainer>

<style global>
  sveapossiblevalues {
    display             : block;
    min-height          : 20rem;
    max-height          : 20rem;
    overflow            : scroll;
  }

  sveapossiblevalue {
    display             : block;
    position            : relative;
    background-color    : var(--background-color);
    color               : var(--text-color);
    text-align          : left;
    overflow            : hidden;
    text-overflow       : ellipsis;
    padding             : .5rem;
    border-radius       : .25rem;
    width               : 15rem;
  }

  sveapossiblevalue:nth-of-type(2n) {
    background-color    : var(--alternate-background-color);
  }
</style>
