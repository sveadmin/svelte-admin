<script>
  import { onMount } from 'svelte'
  import DropdownSearch from '../../block/dropdown-search.svelte'

  export let getValues = data => values, column, columnIndex, baseComponent = 'lookup-text',
            value = '', values = [],  validators = {},
            showHelpers = true, canHideHelpers = false, flipHelpers = false, displayMode = 'combo',
            data, handlers, getKey, isNewValueAllowed = false, isEmptyAllowed = true, maxSuggestions = 10,
            clearValueOnInit = false
  const valueChanged = (event) => {
    if (data[column] != event.detail) {
      data[column] = event.detail
      handlers.updateMeta(data, 'dirty', true);
    }
    handlers.changeComponent(
      baseComponent,
      data,
      columnIndex
    )
  }

  const inputKeyUp = (event) => {
    if (event.detail.keyCode === 27) {
      handlers.changeComponent(
        baseComponent,
        data,
        columnIndex
      )
    }
  }

  values = getValues(data)
</script>
<DropdownSearch
  bind:value
  originalValue={data[column]}
  setFocus={true}
  {data}
  {getKey}
  {canHideHelpers}
  {clearValueOnInit}
  {displayMode}
  {flipHelpers}
  {isNewValueAllowed}
  {isEmptyAllowed}
  {maxSuggestions}
  {showHelpers}
  {validators}
  {values}
  on:keyup={inputKeyUp}
  on:valueChanged={valueChanged}
/>