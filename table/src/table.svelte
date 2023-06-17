<script lang="ts">
  import {
    onMount,
    beforeUpdate,
    createEventDispatcher,
    getContext,
  } from 'svelte';

  import {
    derived,
  } from 'svelte/store'

  import {
    Timer,
  } from '@sveadmin/element'

  import ColumnHeader from './column-header.svelte'
  import Row from './row.svelte'

  import {
    runGenericAction,
    prepareRowAction
  } from './action/index.js'

  import {
    prepareLimitKeyup,
    prepareMasterCheckboxClicked,
    preparePagerClick,
    preparePagerKeyup,
    prepareClearAllSelection,
  } from './event/index.js'

  import {
    getChangeComponent,
    prepareResetOriginalData,
    prepareGetData,
    prepareUpdateMeta,
  } from './handler/index.js'

  import {
    createContext,
    floatCalculator,
    prepareRowReducer,

  } from './helper/index.js'

  import {
    ActionData,
    DataData,
    FloatEvent,
    SETTING_COLUMN_VISIBLE,
    SETTING_TYPE,
    TableContext,
    TableContextKey,
  } from './types.js'

  export let contextKey: TableContextKey = {},
    columnIndices: number[],
    rowIndices: number[]

/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  const context = getContext(contextKey) as TableContext || createContext(contextKey, {})

  const {
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
  } = context

  let floatingHeader: boolean = false

  const dispatch = createEventDispatcher();

  export const get = prepareGetData(contextKey)
  export const updateMeta = prepareUpdateMeta(contextKey)
  export const resetOriginalData = prepareResetOriginalData(contextKey)
  export const changeComponent = getChangeComponent(dispatch, contextKey)

  const runRowAction = prepareRowAction(contextKey)

  const cycleAllChecked = prepareMasterCheckboxClicked(contextKey)
  const pagerKeyUp = preparePagerKeyup(dispatch, contextKey)
  const limitKeyUp = prepareLimitKeyup(dispatch, contextKey)
  const pagerClick = preparePagerClick(dispatch, contextKey)
  const clearAllSelection = prepareClearAllSelection(contextKey)

  const rowReducer = prepareRowReducer(contextKey)

  const floatChange = (event: FloatEvent) => {
    const { isFloating = false } = event.detail
    floatingHeader = isFloating
  }

  data.subscribe(rowReducer)

  const visibleColumnActions = derived(actions, currentValue => currentValue.visibleColumnActions)

  visibleColumnActions.subscribe(currentValue => {
    if (currentValue
      && currentValue.buttons
      && currentValue.buttons[0]) {
      columnIndices = Object.keys(currentValue.buttons)
        .filter((columnIndex) => currentValue.buttons[columnIndex] && Object.keys(currentValue.buttons[columnIndex]).length > 0)
        .map(parseFloat)
        .sort((a, b) => a - b)
      rowIndices = [
        0,
        ...Object.keys(currentValue.buttons[0])
          .map(parseFloat)
      ].sort((a, b) => a - b)
    }

  })

  beforeUpdate(() => {
    const selectionCount = Object.values($rowMeta).reduce((aggregator, rowMetaPiece) => {
      return aggregator + ((rowMetaPiece.selected) ? 1 : 0)
    }, 0)
    rowSelection.set({
      allChecked: true,
      partiallyChecked: false,
      selectionCount,
    })
    if ($rowSelection.allChecked) {
      rowSelection.set({
        allChecked: true,
        partiallyChecked: false,
        selectionCount,
      })
    }
  });

  onMount(() => rowReducer($data))

  const hideColumnActions = (event: Event) : void => {
  // console.log('hidecol', event)
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter'
      && event.key !== 'Escape') {
      return
    }

    actions.hideColumnActions()
    event.preventDefault()
    event.stopPropagation()
  }

</script>

<sveadata class:floating="{floatingHeader}" class:loading="{$loader}">
  <sveatableheader use:floatCalculator on:floatChange={floatChange}>
    <sveaactionbar>
    {#if $rowSelection.selectionCount > 0}
      <svearowselectioncount>
        <svearowselectioncountnumber>{$rowSelection.selectionCount}</svearowselectioncountnumber>
        <svearowselectioncountlabel>selected</svearowselectioncountlabel>
      </svearowselectioncount>
      <svearowselectionclear on:click={clearAllSelection} on:keyup={clearAllSelection}/>
      {#each $actions.row as action}
        <svearowaction on:click={() => runRowAction(action)}>{action.label}</svearowaction>
      {/each}
    {/if}
      <sveaactionspacer />
    {#each $actions.generic as action}
      <sveagenericaction on:click={() => runGenericAction(action)}>{action.label}</sveagenericaction>
      {#if action.interval}
        <Timer interval={action.interval} action={() => runGenericAction(action)} />
      {/if}
    {/each}
    </sveaactionbar>
    <sveadataheader>
      <sveadatatablecontrol>
        <input
          id="allChecked-{contextKey.key || 'table'}"
          type="checkbox"
          bind:checked={$rowSelection.allChecked}
          bind:indeterminate={$rowSelection.partiallyChecked}
          on:click={cycleAllChecked}
        >
        <label for="allChecked-{contextKey.key || 'table'}"></label>
      </sveadatatablecontrol>
      {#each $settings as columnSettings}
        {#if columnSettings[SETTING_TYPE] !== 'hidden'
          && columnSettings[SETTING_COLUMN_VISIBLE]}
          <ColumnHeader {contextKey} {columnSettings} />
        {/if}
      {/each}
    </sveadataheader>
  </sveatableheader>
  <sveadatabody>
    {#each Array($pageDetails.limit) as _, rowIndex}
      <Row {contextKey} {rowIndex} />
    {/each}
  </sveadatabody>
  <sveapagerbar>
    {#if $pager.firstPage}
      <a href="{$pager.firstPage}" class="pager" on:click={pagerClick} data-offset="0">1</a>
    {/if}
    {#if $pager.previousPage}
      <a href="{$pager.previousPage}" class="pager" on:click={pagerClick} data-offset="{$pageDetails.offset - $pageDetails.limit}">{$pageDetails.offset / $pageDetails.limit}</a>
    {/if}
    <sveacurrentpage>
      <input
        id="currentPage-{contextKey.key || 'table'}"
        class="currentPage"
        type="text"
        value="{$pageDetails.offset / $pageDetails.limit + 1}"
        on:keyup={pagerKeyUp} />
      <label for="currentPage-{contextKey.key || 'table'}">
        ⏎
      </label>
    </sveacurrentpage>
    {#if $pager.nextPage}
      <a class="pager"
        data-offset="{$pageDetails.offset + $pageDetails.limit}"
        href="{$pager.nextPage}"
        on:click={pagerClick} >
        {$pageDetails.offset / $pageDetails.limit + 2}
      </a>
    {/if}
    {#if $pager.lastPage}
      <a class="pager"
        data-offset="{Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) * $pageDetails.limit}"
        href="{$pager.lastPage}"
        on:click={pagerClick} >
        {Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) + 1}
      </a>
    {/if}
    <svealimitsetting>
      Items per page
      <input id="limitSetting-{contextKey.key || 'table'}"
        type="text"
        class="limitSetting"
        value="{$pageDetails.limit}"
        on:keyup={limitKeyUp} />
      <label for="limitSetting-{contextKey.key || 'table'}">
        ⏎
      </label>
    </svealimitsetting>
  </sveapagerbar>
  {#if $visibleColumnActions}
    <sveacolumnactions style="left:{$visibleColumnActions.x}px;top:{$visibleColumnActions.y}px">
      {#each columnIndices as columnIndex}
        <sveacolumnactioncolumn>
          {#each rowIndices as rowIndex}
            {#if columnIndex === 0
              && rowIndex === 0}
              <sveacloseactions
                class="icon iconoir-cancel"
                on:click={hideColumnActions}
                on:keyup={hideColumnActions}
                on:touchend={hideColumnActions} >
              </sveacloseactions>
            {:else if $visibleColumnActions.buttons[columnIndex][rowIndex]}
              <sveaaction
                class:icon={$visibleColumnActions.buttons[columnIndex][rowIndex].icon}
                class={($visibleColumnActions.buttons[columnIndex][rowIndex].icon)
                  ? 'iconoir-' + $visibleColumnActions.buttons[columnIndex][rowIndex].icon
                  : ''} >
                  {($visibleColumnActions.buttons[columnIndex][rowIndex].icon)
                    ? ''
                    : $visibleColumnActions.buttons[columnIndex][rowIndex].label}
                </sveaaction>
            {:else}
              <sveaemptyaction></sveaemptyaction>
            {/if}
          {/each}
        </sveacolumnactioncolumn>
      {/each}
    </sveacolumnactions>
  {/if}
</sveadata>

<style global src="./table.css"></style>