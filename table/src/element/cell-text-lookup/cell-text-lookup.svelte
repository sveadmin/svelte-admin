<script lang="ts">
  import {
    onMount,
    beforeUpdate
  } from 'svelte'

  import {
    AllowedDisplayMode,
    DISPLAY_COMBO,
    DISPLAY_LABEL,
    DISPLAY_VALUE,
    Option,
  } from '@sveadmin/element'

  export let displayMode: AllowedDisplayMode = 'combo',
    getValue: (() => string) = null,
    getValues: (() => Option[]) = null,
    highlightMissingValue: boolean = true,
    value: string = null,
    values: Option[] = null

  let lookupTable: {[key: string]: string} = {},
    displayValue: string

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
      case DISPLAY_VALUE:
        displayValue = value
        break
      case DISPLAY_LABEL:
        displayValue = lookupTable[value] || value
        break
      case DISPLAY_COMBO:
        if (value) {
          displayValue = value + ' - ' + lookupTable[value] || '[NEW]'
        } else {
          displayValue = null
        }
        break
    }
  })

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
    if (!values
      && getValues) {
      values = getValues()
    }
    setLookTable()
  })

</script>
{#if displayValue}
  <sveadatacellcontent class:missing={!lookupTable[value] && highlightMissingValue}>
    {displayValue}
  </sveadatacellcontent>
{/if}