<script>
  import { onMount, beforeUpdate } from "svelte";

  export let data, value = '', values = [],  displayMode = 'combo', highlightMissingValue = true,
    getValues = data => values
  let lookupTable = {}, displayValue

  const setLookTable = () => {
    lookupTable = values.reduce(
      (aggregator, row) => {
        if (!lookupTable[row.id]) {
          lookupTable[row.id] = row.value
        }
        return aggregator;
      },
      lookupTable
    )
  }

  beforeUpdate(() => {
    switch (displayMode) {
      case 'value':
        displayValue = value
        break
      case 'label':
        displayValue = lookupTable[value] || value
        break
      case 'combo':
        if (value) {
          displayValue = value + ' - ' + lookupTable[value] || '[NEW]'
        } else {
          displayValue = null
        }
        break
    }
  })

  onMount(() => setLookTable())

  values = getValues(data)
</script>
{#if displayValue}
  <datacellcontent class:missing={!lookupTable[value] && highlightMissingValue}>{displayValue}</datacellcontent>
{/if}