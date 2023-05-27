<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    TextInput
  } from '@sveadmin/element'

  import {
    CellComponent,
    DataData,
    ROW_META_DIRTY,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareUpdateMeta,
  } from '../../handler/index.js'  

  export let baseComponent: CellComponent = 'display-text',
    column: string,
    contextKey: TableContextKey,
    getValue: (() => string) = null,
    id: 'cell-text-input',
    rowIndex: number,
    validators: ValidatorStore,
    value: string = null

  const updateMeta = prepareUpdateMeta(contextKey)

  const context = getContext(contextKey) as TableContext

  const {
    components,
    getKey,
    settings,
  } = context

  let data: DataData

  context.data.subscribe(currentValue => data = currentValue)

  const inputKeyUp = (event: CustomEvent<KeyboardEvent>) => {
    const keyboardEvent = event.detail
    if (keyboardEvent.key !== 'Enter'
      && keyboardEvent.key !== 'Escape') {
      return
    }
    const columnIndex = settings.getColumnPosition(column)
    const rowKey = getKey(data[rowIndex].attributes)

    if (keyboardEvent.key === 'Enter') {
      const target = keyboardEvent.target as HTMLInputElement
      value = target.value;
      if (data[rowIndex].attributes[column] !== value) {
        data[rowIndex].attributes[column] = value;
        updateMeta(
          data[rowIndex].attributes,
          ROW_META_DIRTY,
          true
        )
      }
    }

    components.setByIndex(
      rowKey,
      columnIndex,
      baseComponent
    )
  }

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
  })
</script>
<TextInput
  {id}
  setFocus={true}
  type="text"
  {validators}
  value={value}
  on:keyup={inputKeyUp} />