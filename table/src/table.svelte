<script lang="ts">
  import {
    onMount,
    beforeUpdate,
    createEventDispatcher,
    getContext,
    SvelteComponent,
  } from 'svelte';

  import {
    derived,
    writable,
    Writable,
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
    prepareRowReducer,
  } from './helper/index.js'

  import {
    createContext,
  } from './create-context.js'

  import {
    ActionData,
    DataData,
    FloatEvent,
    SETTING_COLUMN_VISIBLE,
    SETTING_TYPE,
    RowSelectionData,
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

  let fixedElementsHeight = 4.875, //Remove sveatableheader, sveapagerbar and sveadata padding + change (best way to test is to minimize window and have the top bar touch the top of the page while the pager bar the bottom)
    floatingHeader: boolean = false,
    headerHeight: number = 3.0625,
    visionBoundaryRef: typeof HTMLElement = null,
    rowHeight: number = 2.8125,
    workspaceHeight: number = 5,
    scrollHeight = 1.125

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
  const tableLeftScroll: Writable<number> = writable(0)
  const tableTopScroll: Writable<number> = writable(0)

  const rowReducer = prepareRowReducer(contextKey)

  const getWorkspaceHeight = () => {
    const computedStyle = getComputedStyle(document.body)
    const remFactor: number = parseInt(computedStyle.fontSize.replace('px', ''))
    return Math.min(
      window.innerHeight / remFactor - fixedElementsHeight,
      $pageDetails.limit * rowHeight + headerHeight + scrollHeight
    )
  }

  const onResize = () => {
    workspaceHeight = getWorkspaceHeight()
  }

  pageDetails.subscribe(currentValue => {
    workspaceHeight = getWorkspaceHeight()
  })

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

  const adjustSticky = (event: Event) => {
    const target = event.target as HTMLElement
    tableLeftScroll.set(target.scrollLeft)
    tableTopScroll.set(target.scrollTop)
  }

  rowMeta.subscribe(currentValue => {
    const selectionState: RowSelectionData = {
      allChecked: true,
      partiallyChecked: false,
      selectionCount: 0,
    }
    Object.values(currentValue).map(currentRowMeta => {
      selectionState.partiallyChecked = selectionState.partiallyChecked || currentRowMeta.selected
      selectionState.allChecked = selectionState.allChecked && currentRowMeta.selected
      selectionState.selectionCount += (currentRowMeta.selected) ? 1 : 0
    })
    if (selectionState.allChecked) {
      selectionState.partiallyChecked = false
    }

    rowSelection.set(selectionState)
  })
</script>

<svelte:window on:resize={onResize} />

<sveadata class:floating="{floatingHeader}" class:loading="{$loader}" bind:this={visionBoundaryRef}>
  <sveatableheader>
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
  </sveatableheader>
  <sveadataworkspace style="flex-basis: {workspaceHeight}rem">
    <sveadatabody on:scroll={adjustSticky}>
      <sveadataheader style="top: {$tableTopScroll}px">
        <sveadatatablecontrol style="left: {$tableLeftScroll}px">
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
            <ColumnHeader {contextKey} {columnSettings} {visionBoundaryRef} />
          {/if}
        {/each}
      </sveadataheader>
      {#each Array($pageDetails.limit) as _, rowIndex}
        <Row {contextKey} {rowIndex} {tableLeftScroll}/>
      {/each}
    </sveadatabody>
  </sveadataworkspace>
  <sveapagerbar>
    {#if $pager.firstPage}
      <a href="{$pager.firstPage}" class="sveaPager" on:click={pagerClick} data-offset="0">1</a>
    {/if}
    {#if $pager.previousPage}
      <a href="{$pager.previousPage}" class="sveaPager" on:click={pagerClick} data-offset="{$pageDetails.offset - $pageDetails.limit}">{$pageDetails.offset / $pageDetails.limit}</a>
    {/if}
    <sveacurrentpage>
      <input
        id="sveaCurrentPage-{contextKey.key || 'table'}"
        class="sveaCurrentPage"
        type="text"
        value="{$pageDetails.offset / $pageDetails.limit + 1}"
        on:keyup={pagerKeyUp} />
      <label for="sveaCurrentPage-{contextKey.key || 'table'}">
        ⏎
      </label>
    </sveacurrentpage>
    {#if $pager.nextPage}
      <a class="sveaPager"
        data-offset="{$pageDetails.offset + $pageDetails.limit}"
        href="{$pager.nextPage}"
        on:click={pagerClick} >
        {$pageDetails.offset / $pageDetails.limit + 2}
      </a>
    {/if}
    {#if $pager.lastPage}
      <a class="sveaPager"
        data-offset="{Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) * $pageDetails.limit}"
        href="{$pager.lastPage}"
        on:click={pagerClick} >
        {Math.floor($pageDetails.size / $pageDetails.limit - (($pageDetails.size % $pageDetails.limit === 0) ? 1 : 0)) + 1}
      </a>
    {/if}
    <svealimitsetting>
      Items per page
      <input id="sveaLimitSetting-{contextKey.key || 'table'}"
        type="text"
        class="sveaLimitSetting"
        value="{$pageDetails.limit}"
        on:keyup={limitKeyUp} />
      <label for="sveaLimitSetting-{contextKey.key || 'table'}">
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