<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    AllowedDisplayMode,
    DropdownSearch,
    Option,
  } from '@sveadmin/element'

  import {
    CellComponent,
    DataData,
    OriginalDataData,
    ROW_META_DIRTY,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareUpdateMeta,
  } from '../../handler/index.js'

  export let baseComponent: CellComponent = 'lookup-text',
    canHideHelpers = false,
    clearValueOnInit = false,
    column: string,
    contextKey: TableContextKey,
    displayMode: AllowedDisplayMode = 'combo',
    flipHelpers: boolean = false,
    focused: boolean =true,
    getValue: {() : string | number} = null,
    getValues: {() : Array<Option>} = null,
    id: string = 'cell-dropdown-search',
    isEmptyAllowed: boolean = true,
    isNewValueAllowed: boolean = false,
    maxSuggestions: number = 10,
    rowIndex: number,
    showHelpers: boolean = true,
    validators: ValidatorStore = {},
    value: string | number = null,
    values: Array<Option> = null

  let data: DataData,
    originalData: OriginalDataData

  const updateMeta = prepareUpdateMeta(contextKey)
  const context = getContext(contextKey) as TableContext

  const {
    components,
    getKey,
    settings,
  } = context

  context.data.subscribe(currentValue => data = currentValue)
  context.originalData.subscribe(currentValue => originalData = currentValue)

  const valueChanged = (event: CustomEvent<string | null>) => {
    const columnIndex = settings.getColumnPosition(column)
    const rowKey = getKey(data[rowIndex].attributes)
    if (data[rowIndex].attributes[column] != event.detail) {
      data[rowIndex].attributes[column] = event.detail
      updateMeta(data[rowIndex].attributes, ROW_META_DIRTY, true)
    }
    components.setByIndex(
      columnIndex,
      rowKey,
      baseComponent
    )
  }

  const inputKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const columnIndex = settings.getColumnPosition(column)
      const rowKey = getKey(data[rowIndex].attributes)
      components.setByIndex(
        columnIndex,
        rowKey,
        baseComponent
      )
    }
  }

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
    if (!values
      && getValues) {
      values = getValues()
    }
  })
</script>
<DropdownSearch
  {canHideHelpers}
  {clearValueOnInit}
  {displayMode}
  {flipHelpers}
  {focused}
  {getKey}
  {id}
  {isEmptyAllowed}
  {isNewValueAllowed}
  {maxSuggestions}
  originalValue={originalData[getKey(data[rowIndex].attributes)]}
  setFocus={true}
  {showHelpers}
  {validators}
  {value}
  {values}
  on:keyup={inputKeyUp}
  on:valueChanged={valueChanged}
/>