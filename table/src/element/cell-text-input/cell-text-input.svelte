<script lang="ts">
  import {
    onMount,
  } from 'svelte'

  import {
    noop,
  } from 'svelte/internal'

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    Component,
    TextInput
  } from '@sveadmin/element'

  import {
    TableContextKey,
  } from '../../types.js'

  import {
    prepareCellKeyUp,
    prepareCellBlur,
  } from '../../action/index.js'

  export let baseComponent: Component = 'display-text',
    column: string,
    contextKey: TableContextKey,
    getValue: (() => string) = null,
    id: string = 'cell-text-input',
    rowIndex: number,
    saveOnBlur: boolean = false,
    validators: ValidatorStore,
    value: string = null

  const cellKeyUp = prepareCellKeyUp(
    baseComponent,
    contextKey,
    column,
    rowIndex
  )
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
<TextInput
  {id}
  setFocus={true}
  {validators}
  value={value}
  on:blur={saveOnBlur ? cellBlur : noop}
  on:keyup={cellKeyUp} />