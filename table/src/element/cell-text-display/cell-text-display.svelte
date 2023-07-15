<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    SETTING_GET_VALUE,
    TableContext,
    TableContextKey,
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    value: string = null

  const {
    settings,
  } = getContext(contextKey) as TableContext

  const {
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
  <sveadatacellcontent>{value}</sveadatacellcontent>
{/if}