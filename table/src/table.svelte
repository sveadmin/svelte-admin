<script lang="ts">
  import {
    beforeUpdate,
    createEventDispatcher,
    getContext,
  } from 'svelte';

  import {
    Timer,
  } from '@sveadmin/element'

  import ColumnHeader from './column-header.svelte'
  import Cell from './cell.svelte'

  import {
    runGenericAction,
    prepareRowAction
  } from './action/index.js'

  import {
    getLimitKeyup,
    getMasterCheckboxClicked,
    getPagerClick,
    getPagerKeyup,
    prepareClearAllSelection,
  } from './event/index.js'

  import {
    getChangeComponent,
    getResetOriginalData,
    prepareGetData,
    prepareUpdateMeta,
  } from './handler/index.js'

  import {
    floatCalculator,
    prepareRowReducer,

  } from './helper/index.js'

  import {
    FloatEvent,
    TableContext,
    TableContextKey,
  } from './types.js'

  export let contextKey: TableContextKey = {}

/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  let {
    actions,
    data,
    loader,
    pageDetails,
    pager,
    rowKeys,
    rowMeta,
    rowSelection,
    screens,
    settings,
  } = getContext(contextKey) as TableContext

  let floatingHeader: boolean = false

  const dispatch = createEventDispatcher();

  export const get = prepareGetData(contextKey)
  export const updateMeta = prepareUpdateMeta(contextKey)
  export const resetOriginalData = getResetOriginalData(contextKey)
  export const changeComponent = getChangeComponent(dispatch, contextKey)

  const runRowAction = prepareRowAction(contextKey)

  const cycleAllChecked = getMasterCheckboxClicked(contextKey)
  const pagerKeyUp = getPagerKeyup(dispatch, contextKey)
  const limitKeyUp = getLimitKeyup(dispatch, contextKey)
  const pagerClick = getPagerClick(dispatch, contextKey)
  const clearAllSelection = prepareClearAllSelection(contextKey)

  const rowReducer = prepareRowReducer(contextKey)

  const floatChange = (event: FloatEvent) => {
    const { isFloating = false } = event.detail
    floatingHeader = isFloating
  }

  data.subscribe(rowReducer)

  beforeUpdate(() => {
    const selectionCount = Object.values($rowMeta).reduce((aggregator, rowMetaPiece) => {
      return aggregator + ((rowMetaPiece.selected) ? 1 : 0)
    }, 0)
    rowSelection.set({
      allChecked: true,
      partiallyChecked: false,
      selectionCount,
    })
    rowKeys.set([])
    if ($rowSelection.allChecked) {
      rowSelection.set({
        allChecked: true,
        partiallyChecked: false,
        selectionCount,
      })
    }
  });

</script>

<data class:floating="{floatingHeader}" class:loading="{$loader}">
  <tableheader use:floatCalculator on:floatChange={floatChange}>
    <actionbar>
    {#if $rowSelection.selectionCount > 0}
      <rowselectioncount>
        <rowselectioncountnumber>{$rowSelection.selectionCount}</rowselectioncountnumber>
        <rowselectioncountlabel>selected</rowselectioncountlabel>
      </rowselectioncount>
      <rowselectionclear on:click={clearAllSelection}/>
      {#each $actions.row as action}
        <rowaction on:click={() => runRowAction(action)}>{action.label}</rowaction>
      {/each}
    {/if}
      <actionspacer />
    {#each $actions.generic as action}
      <genericaction on:click={() => runGenericAction(action)}>{action.label}</genericaction>
      {#if action.interval}
        <Timer interval={action.interval} action={() => runGenericAction(action)} />
      {/if}
    {/each}
    </actionbar>
    <dataheader>
      <datatablecontrol>
        <input
          id="allChecked-{contextKey.key || 'table'}"
          type="checkbox"
          bind:checked={$rowSelection.allChecked}
          bind:indeterminate={$rowSelection.partiallyChecked}
          on:click={cycleAllChecked}
        >
        <label for="allChecked-{contextKey.key || 'table'}"></label>
      </datatablecontrol>
      {#each $settings as column}
        {#if column.type !== 'hidden'
          && column.columnVisible}
          <ColumnHeader {contextKey} {column} />
        {/if}
      {/each}
    </dataheader>
  </tableheader>
  <databody>
    {#each Array($pageDetails.limit) as _, rowIndex}
      <datarow
        class:saving="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].saving}"
        data-selected="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].selected}"
        data-dirty="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].dirty}"
        data-status="{$rowKeys[rowIndex] && $rowMeta[$rowKeys[rowIndex]].status}"
      >
        <datarowcontrol>
          {#if $rowKeys.hasOwnProperty(rowIndex)}
            <input
              id="row{rowIndex}-{contextKey.key || 'table'}"
              type="checkbox"
              bind:checked={$rowMeta[$rowKeys[rowIndex]].selected}
            >
            <label for="row{rowIndex}-{contextKey.key || 'table'}"></label>
          {/if}
        </datarowcontrol>
      {#each $settings as column, columnIndex}
        {#if $settings[columnIndex].type !== 'hidden'
          && column.columnVisible}
          <Cell {contextKey} {column} {columnIndex} {rowIndex} />
        {/if}
      {/each}
      </datarow>
    {/each}
  </databody>
  <pagerbar>
    {#if $pager.firstPage}
      <a href="{$pager.firstPage}" class="pager" on:click={pagerClick} data-offset="0">1</a>
    {/if}
    {#if $pager.previousPage}
      <a href="{$pager.previousPage}" class="pager" on:click={pagerClick} data-offset="{$pageDetails.offset - $pageDetails.limit}">{$pageDetails.offset / $pageDetails.limit}</a>
    {/if}
    <currentpage>
      <input type="text" id="currentPage-{contextKey.key || 'table'}" class="currentPage" value="{$pageDetails.offset / $pageDetails.limit + 1}" on:keyup={pagerKeyUp} />
      <label for="currentPage-{contextKey.key || 'table'}">⏎</label>
    </currentpage>
    {#if $pager.nextPage}
      <a href="{$pager.nextPage}" class="pager" on:click={pagerClick} data-offset="{$pageDetails.offset + $pageDetails.limit}">{$pageDetails.offset / $pageDetails.limit + 2}</a>
    {/if}
    {#if $pager.lastPage}
      <a href="{$pager.lastPage}" class="pager" on:click={pagerClick} data-offset="{Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) * $pageDetails.limit}">{Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) + 1}</a>
    {/if}
    <limitsetting>
      Items per page
      <input type="text" id="limitSetting-{contextKey.key || 'table'}" class="limitSetting" value="{$pageDetails.limit}" on:keyup={limitKeyUp} />
      <label for="limitSetting-{contextKey.key || 'table'}">⏎</label>
    </limitsetting>
  </pagerbar>
</data>