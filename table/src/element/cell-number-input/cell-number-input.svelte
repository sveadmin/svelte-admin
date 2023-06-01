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
    TableContextKey,
  } from '../../types.js'

  import {
    prepareCellBlur,
  } from '../../action/index.js'

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

  const cellBlur = prepareCellBlur(
    baseComponent,
    contextKey,
    column,
    rowIndex,
  )

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
  on:blur={cellBlur} />