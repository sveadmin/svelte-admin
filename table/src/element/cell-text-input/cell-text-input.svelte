<script lang="ts">
  import {
    getContext,
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
    SETTING_SAVE_ON_BLUR,
    SETTING_TYPE,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareCellKeyUp,
    prepareCellBlur,
  } from '../../action/index.js'

  export let column: string,
    contextKey: TableContextKey,
    getValue: (() => string),
    rowIndex: number,
    value: string

  const {
    settings,
  } = getContext(contextKey) as TableContext

  const columnSettings = settings.getColumn(column),
    id: string = [column, rowIndex].join('-'),
    validators: ValidatorStore = settings.getValidator(column)

  const {
    [SETTING_TYPE]: baseComponent,
    [SETTING_SAVE_ON_BLUR]: saveOnBlur
  } = columnSettings


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