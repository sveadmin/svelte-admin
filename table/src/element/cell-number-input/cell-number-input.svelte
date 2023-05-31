<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    NumberInput,
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

  export let baseComponent: CellComponent = 'number',
    column: string,
    contextKey: TableContextKey,
    decimals: number = 0,
    digits: number = 7,
    getValue: {() : string | number},
    id: string = 'cellNumberInput',
    rowIndex: number,
    thousandSeparator: number,
    validators: ValidatorStore,
    value: string | number = ''

  const updateMeta = prepareUpdateMeta(contextKey)

  const context = getContext(contextKey) as TableContext

  const {
    components,
    getKey,
    settings,
  } = context

  let data: DataData

  context.data.subscribe(currentValue => data = currentValue)

  const editorClosed = (event: CustomEvent<Event>) => {
    const target = event.detail.target as HTMLInputElement
    const value = target.value
    const columnIndex = settings.getColumnPosition(column)
    const rowKey = getKey(data[rowIndex].attributes)
    if (data[rowIndex].attributes[column] !== value) {
      data[rowIndex].attributes[column] = value;
      updateMeta(
        data[rowIndex].attributes,
        ROW_META_DIRTY,
        true
      )
    }
    components.setByIndex(
      columnIndex,
      rowKey,
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
<NumberInput
  {decimals}
  {digits}
  editor={true}
  {id}
  {thousandSeparator}
  {validators}
  {value}
  on:blur={editorClosed} />