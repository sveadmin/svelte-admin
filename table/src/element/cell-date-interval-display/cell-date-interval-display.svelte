<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    noop,
  } from 'svelte/internal'

  import {
    DISPLAY_INTERVAL_DATE,
    DISPLAY_INTERVAL_INTERVAL,
    DateIntervalDisplay,
    prepareSimpleIntervalDictionary
  } from '@sveadmin/element'

  import {
    SETTING_DISPLAY_MODE,
    SETTING_FORMAT,
    SETTING_IS_HIGHLIGHTED,
    SETTING_ON_CLICK,
    SETTING_PREFIX,
    SETTING_POSTFIX,
    SETTING_REFRESH_AT,
    SETTING_SECONDS_DENOMINATOR,
    TableContext,
    TableContextKey,
    SETTING_GET_VALUE,
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    value: string | Date

  const {
    settings,
  } = getContext(contextKey) as TableContext

  const columnSettings = settings.getColumn(column)

  const {
    [SETTING_DISPLAY_MODE]: displayMode = DISPLAY_INTERVAL_INTERVAL,
    [SETTING_GET_VALUE]: getValue,
    [SETTING_FORMAT]: format,
    [SETTING_IS_HIGHLIGHTED]: isHighlighted = () => false,
    [SETTING_ON_CLICK]: onClick = noop,
    [SETTING_REFRESH_AT]: refreshAt = 0,
    [SETTING_SECONDS_DENOMINATOR]: secondsDenominator = 1000
  } = columnSettings

  let {
    [SETTING_PREFIX]: prefix = (isPastDate: boolean) => '',
    [SETTING_POSTFIX]: postfix = (isPastDate: boolean) => '',
  } = columnSettings

  if (typeof prefix !== 'function') {
    const prefixPieces = prefix.split('$')
    prefix = (isPastDate: boolean) => (isPastDate) ? prefixPieces[0] : prefixPieces[1]
  }

  if (typeof postfix !== 'function') {
    const postfixPieces = postfix.split('$')
    postfix = (isPastDate: boolean) => (isPastDate) ? postfixPieces[0] : postfixPieces[1]
  }

  const dateIntervalDictionary = prepareSimpleIntervalDictionary(prefix, postfix)

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
  })

</script>
{#if typeof value !== 'undefined'
  && value !== null}
  <DateIntervalDisplay
    {dateIntervalDictionary}
    {displayMode}
    {format}
    {isHighlighted}
    {refreshAt}
    {secondsDenominator}
    {value}
    on:click={onClick} />
{/if}