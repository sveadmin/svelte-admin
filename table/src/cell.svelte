<script>
  import { getContext, beforeUpdate, createEventDispatcher } from 'svelte';

  import { 
    Button,
    CheckboxSwitch,
    CompetitionTag,
    DisplayDate,
    DisplayDateDiff,
    DisplayInterval,
    DisplayText,
    DropdownSearch,
    Image,
    InputNumber,
    InputText,
    InputTranslation,
    JsonDisplay,
    Link,
    LookupText,
    LinkedTag,
    Number,
    PrivilegeTags,
    SetTag,
    Svg,
    TranslatedText,
  } from './cell'

  import {
    getCellClicked,
    getSelectionSet,
    getTouch,
  } from './event'

  import {
    getChangeComponent,
    getResetOriginalData,
    prepareGetData,
    prepareUpdateMeta,
  } from './handler'

  import {
    comparator,
  } from './helper'

  export let contextKey = {}, column, columnIndex, rowIndex

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
  } = column

/**
 * Default  values are needed as usually the new component runs without the context being setup
 */
  let {
    components,
    data,
    editors,
    meta,
    originalData,
    rowKeys,
    selection,
    settings,
    getKey
  } = getContext(contextKey)

  let type, attributes = {}

  $: { // This depends on components and rowKeys updates
    if ($components[$rowKeys[rowIndex]]) {
      type = $components[$rowKeys[rowIndex]][columnIndex] || 'display-text'
    } else {
      type = 'display-text'
    }
  }

  // components.subscribe(currentValue => {
  //   if (currentValue[$rowKeys[rowIndex]]) {
  //     type = currentValue[$rowKeys[rowIndex]][columnIndex] || 'display-text'
  //   } else {
  //     type = 'display-text'
  //   }
  // })

  data.subscribe(currentValue => {
    if (currentValue[rowIndex] && currentValue[rowIndex].attributes) {
      if ($settings.columns[columnIndex].repeatedColumns) {
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
  export const resetOriginalData = getResetOriginalData(contextKey)
  export const changeComponent = getChangeComponent(dispatch, contextKey)
  const handlers = {
    get,
    updateMeta,
    changeComponent,
    resetOriginalData
  }

  const handleCellClick = getCellClicked(contextKey)

  const handleSelect = getSelectionSet(contextKey)

  const {start: handleTouchStart, end: handleTouchEnd, move: handleTouchMove} = getTouch(contextKey)

</script>

<datacell
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
  class:dirty="{$rowKeys[rowIndex] && $originalData[$rowKeys[rowIndex]] && comparator(attributes[field]) != $originalData[$rowKeys[rowIndex]][field]}"
  class:overflow="{$rowKeys[rowIndex] && type === 'dd-search'}"
  class:status="{$settings.columns[columnIndex].statusCheck}"
  class="{$settings.columns[columnIndex].statusCheck && $settings.columns[columnIndex].statusCheck(attributes)}"
  data-row="{rowIndex}"
  data-column="{columnIndex}"
  on:dblclick={handleCellClick}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:touchmove={handleTouchMove}
  on:click={handleSelect}
>
  <!-- {#if selection.top == rowIndex && selection.left == columnIndex}
      <resizer on:touchmove={handleResizerMove} on:touchcancel|preventDefault class="topleft"></resizer>
  {/if} -->

  {#if type === 'display-text'}
    <DisplayText value={attributes[field]}/>
  {:else if type === 'json'}
    <JsonDisplay
      value={attributes[field]} 
      format={$settings.columns[columnIndex].format}
      />
  {:else if type === 'number'}
    <Number
      value={attributes[field]} 
      digits={$settings.columns[columnIndex].digits}
      decimals={$settings.columns[columnIndex].decimals}
      />
  {:else if type === 'display-interval'}
    <DisplayInterval value={attributes[field]}/>
  {:else if type === 'display-date'}
    <DisplayDate value={attributes[field]} format={format || 'yyyy-mm-dd HH:MM'}/> 
  {:else if type === 'display-date-diff'}
    <DisplayDateDiff
      value={attributes[field]}
      prefix={prefix}
      postfix={postfix}
      isHighlighted={isHighlighted || (() => false)} />
  {:else if type === 'lookup-text'}
    <LookupText
      data={attributes}
      value={attributes[field]}
      values={$settings.columns[columnIndex].values}
      getValues={$settings.columns[columnIndex].getValues}
      displayMode={$settings.columns[columnIndex].displayMode} />
  {:else if type === 'link'}
    <Link
      value={attributes[field]}
      name={$settings.columns[columnIndex].route}
      attributes={(typeof $settings.columns[columnIndex].getAttributes === 'function')
        ? $settings.columns[columnIndex].getAttributes(rowIndex)
        : attributes} />
  {:else if type === 'image'}
    <Image src={attributes[field]} />
  {:else if type === 'svg'}
    <Svg data={attributes[field]} />
  {:else if type === 'input-number'}
    <InputNumber
      value={attributes[field]}
      digits={$settings.columns[columnIndex].digits}
      decimals={$settings.columns[columnIndex].decimals}
      column={field}
      {columnIndex}
      data={attributes}
      validators={settings.getValidator(field)}
      baseComponent={$settings.columns[columnIndex].type}
      {handlers} />
  {:else if type === 'input-text'}
    <InputText
      value={attributes[field]}
      column={field}
      {columnIndex}
      data={attributes}
      validators={settings.getValidator(field)}
      baseComponent={$settings.columns[columnIndex].type}
      {handlers} />
  {:else if type === 'dd-search'}
    <DropdownSearch
      value={attributes[field]}
      column={field}
      {columnIndex}
      data={attributes}
      values={$settings.columns[columnIndex].values}
      getValues={$settings.columns[columnIndex].getValues}
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
  {:else if type === 'privilege-tags'}
    <PrivilegeTags
      bind:value={attributes[field]}
      values={$settings.columns[columnIndex].values}
      {getKey} />
  {:else if type === 'checkbox-switch'}
    <CheckboxSwitch
      bind:value={attributes[field]}
      name={field}
      data={attributes}
      disabled={!!$settings.columns[columnIndex].readOnly}
      onChange={$settings.columns[columnIndex].onChange}
      {getKey}
      {handlers} />
  {:else if type === 'button'}
    <Button
      {rowIndex}
      callback={$settings.columns[columnIndex].buttonCallback}
      label={$settings.columns[columnIndex].buttonLabel} />
  {:else if type === 'player'}
    <DisplayText value={attributes[field] && attributes[field].playerName}/>
  {:else if type === 'translated-text'}
    <TranslatedText
      value={attributes[field]}
      locales={$settings.columns[columnIndex].locales}
      locale={$meta[column.id + '-locale']}
      showLocale={$settings.columns[columnIndex].showLocale}/>
  {:else if type === 'input-translation'}
    <InputTranslation
      value={attributes[field]}
      locale={$meta[column.id + '-locale']}
      {columnIndex}
      data={attributes}
      validators={settings.getValidator(field)}
      baseComponent={$settings.columns[columnIndex].type}
      {handlers} />
  {:else if type === 'set-tags'}
    <SetTag value={attributes[field]} />
  {:else if type === 'market-tags'}
    <LinkedTag
      name='market'
      value={attributes[field]}
      values={$settings.columns[columnIndex].values} />
  {:else if type === 'competition-tags'}
    <CompetitionTag value={attributes[field]} />
  {/if}
</datacell>