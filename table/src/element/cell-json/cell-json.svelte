<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    DISPLAY_JSON_FILTERED,
    Json,
  } from '@sveadmin/element'
  
  import {
    SETTING_DISPLAY_MODE,
    SETTING_FIELDS,
    SETTING_GET_VALUE,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    value = ''

  const {
    settings,
  } = getContext(contextKey) as TableContext

  const {
    [SETTING_DISPLAY_MODE]: displayMode = DISPLAY_JSON_FILTERED,
    [SETTING_FIELDS]: fields = [],
    [SETTING_GET_VALUE]: getValue,
  } = settings.getColumn(column)

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }
  })

</script>
{#if value}
  <Json
    {displayMode}
    {fields}
    {value} />
{/if}