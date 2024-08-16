<script lang="ts">
  import {
    getContext
  } from 'svelte'

  import {
    derived,
    writable,
    Writable,
  } from 'svelte/store'

  import {
    RowKeyData,
    SETTING_COLUMN_VISIBLE,
    TableContext,
    TableContextKey,
  } from './types.js'

  import Cell from './cell.svelte'

  export let contextKey: TableContextKey,
    rowIndex: number,
    tableLeftScroll: Writable<number> = writable(0),

  const {
    data,
    massEditor,
    rowKeys,
    rowMeta,
    settings,
  } = getContext(contextKey) as TableContext

  const adjustedScroll: Writable<number> = writable(0)
  
  let columnsBuffer = JSON.stringify({})

  const currentRowKey = derived(rowKeys, (rowKeyData: RowKeyData) => rowKeyData[rowIndex])
  const columnsToExport = derived(massEditor, (currentValue, set) => {
    if (currentValue
      && currentValue.columnsToExport
      && columnsBuffer !== JSON.stringify(currentValue.columnsToExport)) {
      columnsBuffer = JSON.stringify(currentValue.columnsToExport)
      set(currentValue.columnsToExport)
    }
  })


  tableLeftScroll.subscribe(currentValue => {
    const computedStyle = getComputedStyle(document.body)
    const remFactor: number = parseInt(computedStyle.fontSize.replace('px', ''))
    adjustedScroll.set(currentValue - 2.5 * remFactor)
  })

  data.subscribe(currentValue => {
    if ($massEditor.display
      && currentValue[rowIndex]
      && currentValue[rowIndex].attributes) {
        massEditor.addLine($data[rowIndex].attributes)
    }
  })

  columnsToExport.subscribe(currentValue => {
    if ($massEditor.display
      && $data[rowIndex]
      && $data[rowIndex].attributes) {
        massEditor.addLine($data[rowIndex].attributes)
    }
  })

</script>

<sveadatarow
  class:saving="{$currentRowKey && $rowMeta[$currentRowKey].saving}"
  data-selected="{$currentRowKey && $rowMeta[$currentRowKey].selected}"
  data-dirty="{$currentRowKey && $rowMeta[$currentRowKey].dirty}"
  data-status="{$currentRowKey && $rowMeta[$currentRowKey].status}"
>
  <sveadatarowcontrol style="left: {$adjustedScroll}px">
    {#if $currentRowKey}
      <input
        id="row{rowIndex}-{contextKey.key || 'table'}"
        type="checkbox"
        bind:checked={$rowMeta[$currentRowKey].selected}
      >
      <label for="row{rowIndex}-{contextKey.key || 'table'}"></label>
    {/if}
  </sveadatarowcontrol>
  {#each $settings as columnSettings, columnIndex}
    {#if $settings[columnIndex].type !== 'hidden'
      && columnSettings[SETTING_COLUMN_VISIBLE]}
      <Cell {contextKey} {columnIndex} {rowIndex} />
    {/if}
  {/each}
</sveadatarow>

<style global src="./row.css"></style>