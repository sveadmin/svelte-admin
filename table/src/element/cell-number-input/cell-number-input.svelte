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
    NumberInput,
  } from '@sveadmin/element'

  import {
    SETTING_DECIMALS,
    SETTING_DIGITS,
    SETTING_THOUSAND_SEPARATOR,
    SETTING_TYPE,
    SETTING_SAVE_ON_BLUR,
    TableContext,
    TableContextKey,
    SETTING_GET_VALUE,
  } from '../../types.js'

  import {
    prepareCellBlur,
  } from '../../action/index.js'

  export let column: string,
    contextKey: TableContextKey,
    rowIndex: number,
    value: string | number = ''

  const {
    settings,
  } = getContext(contextKey) as TableContext

  const id: string = ['number-input',column, rowIndex].join('-'),
    validators: ValidatorStore = settings.getValidator(column)

  const {
    [SETTING_DECIMALS]: decimals = 2,
    [SETTING_DIGITS]: digits = 7,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_THOUSAND_SEPARATOR]: thousandSeparator = 3,
    [SETTING_TYPE]: baseComponent,
    [SETTING_SAVE_ON_BLUR]: saveOnBlur
  } = settings.getColumn(column)

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
  on:blur={saveOnBlur ? cellBlur : noop} />