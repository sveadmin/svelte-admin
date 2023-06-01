<script lang="ts">
  import {
    getContext
  } from 'svelte'

  import {
    TableContext,
    TableContextKey,
  } from './types.js'

  import Cell from './cell.svelte'

  export let contextKey: TableContextKey,
    rowIndex: number

  const {
    rowKeys,
    rowMeta,
    settings,
  } = getContext(contextKey) as TableContext

</script>

<sveadatarow
  class:saving="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].saving}"
  data-selected="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].selected}"
  data-dirty="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].dirty}"
  data-status="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].status}"
>
  <sveadatarowcontrol>
    {#if $rowKeys.hasOwnProperty(rowIndex)}
      <input
        id="row{rowIndex}-{contextKey.key || 'table'}"
        type="checkbox"
        bind:checked={$rowMeta[$rowKeys[rowIndex]].selected}
      >
      <label for="row{rowIndex}-{contextKey.key || 'table'}"></label>
    {/if}
  </sveadatarowcontrol>
{#each $settings as column, columnIndex}
  {#if $settings[columnIndex].type !== 'hidden'
    && column.columnVisible}
    <Cell {contextKey} {columnIndex} {rowIndex} />
  {/if}
{/each}
</sveadatarow>

<style global src="./row.css"></style>