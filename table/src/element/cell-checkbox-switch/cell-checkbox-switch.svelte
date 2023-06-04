<script lang="ts">
  import {
    getContext,
    onMount
  } from 'svelte'


  import {
    CheckboxSwitch
  } from '@sveadmin/element'

  import {
    DataData,
    ROW_META_DIRTY,
    SETTING_DISABLED,
    SETTING_GET_VALUE,
    SETTING_PARAMETERS,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareUpdateMeta,
  } from '../../handler/index.js'

  export let column: string,
    contextKey: TableContextKey,
    rowIndex: number,
    value: boolean

  let data: DataData

  const updateMeta = prepareUpdateMeta(contextKey)
  const context = getContext(contextKey) as TableContext
  const {
    getKey,
    settings,
  } = context

  const id: string = ['checkbox-', column, rowIndex].join('-')

  context.data.subscribe((currentValue: DataData) => data = currentValue)

  const {
    [SETTING_DISABLED]: disabled = false,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_PARAMETERS]: labels,
  } = settings.getColumn(column)

  const onValueChanged = (event: CustomEvent<boolean>) => {
    updateMeta(data[rowIndex].attributes, ROW_META_DIRTY, true)
    //TODO: redispatch? Does click propageate up if no listener is added?
  }

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
  })

</script>
{#if typeof value !== 'undefined'}
  <CheckboxSwitch
    {disabled}
    {id}
    {labels}
    bind:value={value}
    on:valueChanged={onValueChanged} />
{/if}
