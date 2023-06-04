<script lang="ts">
  import {
    getContext,
  } from 'svelte';

  import {
    derived,
  } from 'svelte/store';


  import {
    prepareCellClicked,
    prepareSelectionSet,
    prepareTouch,
  } from './event/index.js'

  import {
    comparator,
    getComponent,
  } from './helper/index.js'

  import {
    ComponentElementStore,
    RowAttributes,
    SETTING_ALIGN,
    SETTING_BASE,
    SETTING_FIELD,
    SETTING_GROW,
    SETTING_ID,
    SETTING_MAX,
    SETTING_SHRINK,
    TableContext,
    TableContextKey,
  } from './types.js'

  export let contextKey: TableContextKey = {},
    columnIndex: number,
    rowIndex: number

/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  let {
    components,
    data,
    originalData,
    rowKeys,
    selection,
    settings,
  } = getContext(contextKey) as TableContext

  const {
    [SETTING_ALIGN]: align = 'left',
    [SETTING_BASE]: base = 4,
    [SETTING_FIELD]: field,
    [SETTING_GROW]: grow = 0,
    [SETTING_ID]: id,
    [SETTING_MAX]: max = 50,
    [SETTING_SHRINK]: shrink = 0,
  } = $settings[columnIndex]

  const rowKey = derived(rowKeys, rowKeys => rowKeys[rowIndex])

  let attributes: RowAttributes = {},
    type: ComponentElementStore,
    value: any

  const componentUnsubscribe = components.subscribe(currentComponent => {
    window.setTimeout(typeSubscribe, 0)
  })

  const rowKeyUnsubscribe = rowKey.subscribe(currentRowKey => {
    window.setTimeout(typeSubscribe, 0)
  })

  function typeSubscribe() {
    if (!$components
      || !$rowKey
      || $type) {
      return
    }

    type = $components
    && $components[$rowKey]
    && $components[$rowKey][columnIndex]

    if (componentUnsubscribe) {
      componentUnsubscribe()
    }
    if (rowKeyUnsubscribe) {
      rowKeyUnsubscribe()
    }
  }


  data.subscribe(currentValue => {
    if (currentValue[rowIndex] && currentValue[rowIndex].attributes) {
      if ($settings[columnIndex].repeatedColumns) {
        const selectedColumn = currentValue[rowIndex].attributes[id].find(cv => cv.key === field) || {}
        attributes = {}
        attributes[field] = selectedColumn.value || selectedColumn.object
      } else {
        attributes = currentValue[rowIndex].attributes
      }

      value = ($settings[columnIndex].getValue)
        ? $settings[columnIndex].getValue(attributes)
        : attributes[field]
    }

  })

  const handleCellClick = prepareCellClicked(contextKey)

  const handleSelect = prepareSelectionSet(contextKey)

  const {start: handleTouchStart, end: handleTouchEnd, move: handleTouchMove} = prepareTouch(contextKey)
</script>

<sveadatacell
  style="flex:{grow} {shrink} {base}rem;max-width:{max}rem;"
  class:alignRight="{align === 'right'}"
  class:top="{$selection.top == rowIndex 
              && $selection.left <= columnIndex 
              && ($selection.right || $selection.left) >= columnIndex}"
  class:left="{$selection.left == columnIndex
              && $selection.top <= rowIndex
              && ($selection.bottom || $selection.top) >= rowIndex}"
  class:bottom="{($selection.bottom || $selection.top) == rowIndex
              && $selection.left <= columnIndex
              && ($selection.right || $selection.left) >= columnIndex}"
  class:right="{($selection.right || $selection.left) == columnIndex
              && $selection.top <= rowIndex
              && ($selection.bottom || $selection.top) >= rowIndex}"
  class:dirty="{$rowKey && $originalData[$rowKey] && comparator(attributes[field]) != $originalData[$rowKey][field]}"
  class:overflow="{$rowKey && $type === 'dd-search'}"
  class:status="{$settings[columnIndex].statusCheck}"
  class="{$settings[columnIndex].statusCheck && $settings[columnIndex].statusCheck(attributes)}"
  data-row="{rowIndex}"
  data-column="{columnIndex}"
  on:dblclick={handleCellClick}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchmove={handleTouchMove}
  on:click={handleSelect}
  on:keyup={handleCellClick}
>
  <svelte:component
    column={field}
    {contextKey}
    {rowIndex}
    this={getComponent($type)}
    value={attributes[field]} />

  <!-- {#if selection.top == rowIndex && selection.left == columnIndex}
      <resizer on:touchmove={handleResizerMove} on:touchcancel|preventDefault class="topleft"></resizer>
  {/if} -->
  <!--
  {:else if type === 'translated-text'}
    <TranslatedText
      value={attributes[field]}
      locales={$settings[columnIndex].locales}
      locale={$meta[column.id + '-locale']}
      showLocale={$settings[columnIndex].showLocale}/>
  {:else if $type === 'input-translation'}
    <InputTranslation
      value={attributes[field]}
      locale={$meta[column.id + '-locale']}
      {columnIndex}
      validators={settings.getValidator(field)}
      baseComponent={$settings[columnIndex].type}
      {handlers} />
  {/if} -->
</sveadatacell>

<style global src="./cell.css"></style>