<script lang="ts">
  import {
    getContext,
    onMount
  } from 'svelte'


  import {
    CheckboxSwitch
  } from '@sveadmin/common'

  import {
    DataData,
    ROW_META_DIRTY,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  import {
    prepareUpdateMeta,
  } from '../../handler/index.js'

  export let contextKey: TableContextKey,
    disabled: boolean = false,
    falseLabel: string = '',
    getValue: (() => boolean),
    name: string = 'cell-switch',
    rowIndex: number,
    trueLabel: string = '',
    uniqueKey: string,
    value: boolean

  let data: DataData

  const updateMeta = prepareUpdateMeta(contextKey)
  const context = getContext(contextKey) as TableContext
  const {
    getKey
  } = context

  context.data.subscribe((currentValue: DataData) => data = currentValue)

  const onValueChanged = (event: CustomEvent<boolean>) => {
    updateMeta(data[rowIndex].attributes, ROW_META_DIRTY, true)
    //TODO: redispatch? Does click propageate up if no listener is added?
  }

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
    uniqueKey = '-' + getKey(data[rowIndex].attributes)
  })

</script>
{#if typeof value !== 'undefined'}
  <CheckboxSwitch
    {disabled}
    {falseLabel}
    {name}
    {trueLabel}
    {uniqueKey}
    bind:value={value}
    on:valueChanged={onValueChanged} />
{/if}
