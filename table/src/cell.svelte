<script lang="ts">
  import {
    createEventDispatcher,
    getContext,
  } from 'svelte';

  import {
    derived,
    get as testGet,
  } from 'svelte/store';

  import {
    noop,
  } from 'svelte/internal'

  import {
    Component,
    COMPONENT_BUTTON,
    COMPONENT_CHECKBOX_SWITCH,
    COMPONENT_DATE_DISPLAY,
    COMPONENT_DATE_INTERVAL,
    COMPONENT_DROPDOWN_SEARCH,
    COMPONENT_DATE_INTERVAL_DISPLAY,
    COMPONENT_JSON,
    COMPONENT_LINK,
    COMPONENT_NUMBER_DISPLAY,
    COMPONENT_NUMBER_INPUT,
    COMPONENT_SVG,
    COMPONENT_TAG,
    COMPONENT_TEXT_DISPLAY,
    COMPONENT_TEXT_INPUT,
    COMPONENT_TEXT_LOOKUP,
  } from '@sveadmin/element'

  import { 
    CellButton,
    CellCheckboxSwitch,
    CellDateDisplay,
    CellDateIntervalDisplay,
    CellDropdownSearch,
    CellImage,
    CellIntervalDisplay,
    CellJson,
    CellLink,
    CellNumberDisplay,
    CellNumberInput,
    CellSvg,
    CellTag,
    CellTextDisplay,
    CellTextInput,
    CellTextLookup,
  } from './element/index.js'

  import {
    prepareCellClicked,
    prepareSelectionSet,
    prepareTouch,
  } from './event/index.js'

  import {
    getChangeComponent,
    prepareResetOriginalData,
    prepareGetData,
    prepareUpdateMeta,
  } from './handler/index.js'

  import {
    comparator,
  } from './helper/index.js'

  import {
    ComponentElementStore,
    RowAttributes,
    SETTING_DECIMALS,
    SETTING_DIGITS,
    SETTING_THOUSAND_SEPARATOR,
    SETTING_TYPE,
    SettingsList,
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
    meta,
    originalData,
    rowKeys,
    selection,
    settings,
    getKey
  } = getContext(contextKey) as TableContext

  const {
    align = 'left',
    base = 4,
    field,
    format = 'yyyy-mm-dd HH:MM',
    grow = 0,
    id,
    isHighlighted = () => false,
    max = 50,
    prefix = 'in ',
    postfix = ' ago',
    shrink = 0,
  } = $settings[columnIndex]

  const rowKey = derived(rowKeys, rowKeys => rowKeys[rowIndex])

  let attributes: RowAttributes = {},
    type: ComponentElementStore

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
    } else {
      attributes = {}
    }
  })

  const dispatch = createEventDispatcher();

  export const get = prepareGetData(contextKey)
  export const updateMeta = prepareUpdateMeta(contextKey)
  export const resetOriginalData = prepareResetOriginalData(contextKey)
  export const changeComponent = getChangeComponent(dispatch, contextKey)
  const handlers = {
    get,
    updateMeta,
    changeComponent,
    resetOriginalData
  }

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
  <!-- {#if selection.top == rowIndex && selection.left == columnIndex}
      <resizer on:touchmove={handleResizerMove} on:touchcancel|preventDefault class="topleft"></resizer>
  {/if} -->
  {#if $type === COMPONENT_TEXT_DISPLAY}
    <CellTextDisplay value={attributes[field]}/>
  {:else if $type === COMPONENT_JSON}
    <CellJson
      value={attributes[field]} 
      />
  {:else if $type === COMPONENT_NUMBER_DISPLAY}
    <CellNumberDisplay
      value={attributes[field]} 
      digits={$settings[columnIndex].digits}
      decimals={$settings[columnIndex].decimals}
      />
  {:else if $type === COMPONENT_DATE_INTERVAL_DISPLAY}
    <CellDateIntervalDisplay value={attributes[field]}/>
  {:else if $type === 'display-date'}
    <DisplayDate value={attributes[field]} format={format || 'yyyy-mm-dd HH:MM'}/> 
  {:else if $type === 'display-date-diff'}
    <DisplayDateDiff
      value={attributes[field]}
      prefix={prefix}
      postfix={postfix}
      isHighlighted={isHighlighted || (() => false)} />
  {:else if $type === 'lookup-text'}
    <LookupText
      data={attributes}
      value={attributes[field]}
      values={$settings[columnIndex].values}
      getValues={$settings[columnIndex].getValues}
      displayMode={$settings[columnIndex].displayMode} />
  {:else if $type === 'link'}
    <Link
      value={attributes[field]}
      name={$settings[columnIndex].route}
      attributes={(typeof $settings[columnIndex].getAttributes === 'function')
        ? $settings[columnIndex].getAttributes(rowIndex)
        : attributes} />
  {:else if $type === 'image'}
    <Image src={attributes[field]} />
  {:else if $type === 'svg'}
    <Svg data={attributes[field]} />
  {:else if $type === COMPONENT_NUMBER_INPUT}
    <CellNumberInput
      baseComponent={$settings[columnIndex][SETTING_TYPE]}
      column={field}
      {contextKey}
      decimals={$settings[columnIndex][SETTING_DECIMALS]}
      digits={$settings[columnIndex][SETTING_DIGITS]}
      {rowIndex}
      thousandSeparator={$settings[columnIndex][SETTING_THOUSAND_SEPARATOR]}
      validators={settings.getValidator(field)}
      value={attributes[field]} />
  {:else if $type === COMPONENT_TEXT_INPUT}
    <CellTextInput
      baseComponent={$settings[columnIndex][SETTING_TYPE]}
      column={field}
      {contextKey}
      {rowIndex}
      validators={settings.getValidator(field)}
      value={attributes[field]} />
  {:else if $type === 'dd-search'}
    <DropdownSearch
      value={attributes[field]}
      column={field}
      {columnIndex}
      data={attributes}
      values={$settings[columnIndex].values}
      getValues={$settings[columnIndex].getValues}
      validators={settings.getValidator(field)}
      baseComponent={editors.getOptions(field).baseComponent ?? 'lookup-text'}
      canHideHelpers={editors.getOptions(field).canHideHelpers ?? false}
      clearValueOnInit={editors.getOptions(field).clearValueOnInit ?? false}
      displayMode={editors.getOptions(field).displayMode ?? 'combo'}
      flipHelpers={editors.getOptions(field).flipHelpers ?? false}
      isNewValueAllowed={editors.getOptions(field).isNewValueAllowed ?? false}
      isEmptyAllowed={editors.getOptions(field).isEmptyAllowed ?? true}
      showHelpers={editors.getOptions(field).showHelpers ?? true}
      {handlers}
      {getKey} />
  {:else if $type === 'privilege-tags'}
    <PrivilegeTags
      bind:value={attributes[field]}
      values={$settings[columnIndex].values}
      {getKey} />
  {:else if $type === 'checkbox-switch'}
    <CheckboxSwitch
      bind:value={attributes[field]}
      name={field}
      data={attributes}
      disabled={!!$settings[columnIndex].readOnly}
      onChange={$settings[columnIndex].onChange}
      {getKey}
      {handlers} />
  {:else if $type === 'button'}
    <Button
      {rowIndex}
      callback={$settings[columnIndex].buttonCallback}
      label={$settings[columnIndex].buttonLabel} />
  {:else if $type === 'player'}
    <DisplayText value={attributes[field] && attributes[field].playerName}/>
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
      data={attributes}
      validators={settings.getValidator(field)}
      baseComponent={$settings[columnIndex].type}
      {handlers} />
  {:else if $type === 'set-tags'}
    <SetTag value={attributes[field]} />
  {:else if $type === 'market-tags'}
    <LinkedTag
      name='market'
      value={attributes[field]}
      values={$settings[columnIndex].values} />
  {:else if $type === 'competition-tags'}
    <CompetitionTag value={attributes[field]} />
  {/if}
</sveadatacell>

<style global src="./cell.css"></style>