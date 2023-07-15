<script lang="ts">
  import {
    getContext,
    onMount,
    beforeUpdate
  } from 'svelte'

  import {
    AllowedDropdownDisplayMode,
    DISPLAY_DROPDOWN_COMBO,
    DISPLAY_DROPDOWN_LABEL,
    DISPLAY_DROPDOWN_VALUE,
    Option,
  } from '@sveadmin/element'

  import {
    RowAttributes,
    SETTING_DISPLAY_MODE,
    SETTING_GET_VALUE,
    SETTING_GET_VALUES,
    SETTING_IS_HIGHLIGHTED,
    SETTING_VALUES,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    rowIndex: number,
    value: string = null

  let isMissing: boolean = false,
    lookupTable: {[key: string]: string} = {},
    displayValue: string

  const {
    data,
    settings,
  } = getContext(contextKey) as TableContext

  let {
    [SETTING_DISPLAY_MODE]: displayMode = DISPLAY_DROPDOWN_COMBO,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_GET_VALUES]: getValues,
    [SETTING_IS_HIGHLIGHTED]: isHighlighted = (attributes: RowAttributes) => !lookupTable[attributes[column]],
    [SETTING_VALUES]: values,
  } = settings.getColumn(column)

  const updateDisplayValue = () => {
    switch (displayMode) {
      case DISPLAY_DROPDOWN_VALUE:
        displayValue = value
        break
      case DISPLAY_DROPDOWN_LABEL:
        displayValue = lookupTable[value] || value
        break
      case DISPLAY_DROPDOWN_COMBO:
        if (value) {
          displayValue = value + ' - ' + lookupTable[value] || '[NEW]'
        } else {
          displayValue = null
        }
        break
    }
    isMissing = isHighlighted(data.getRowAttributes(rowIndex))
  }

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
    updateDisplayValue()
  }

  beforeUpdate(() => {
    updateDisplayValue()
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
  <sveadatacellcontent class:missing={isMissing}>
    {displayValue}
  </sveadatacellcontent>
{/if}