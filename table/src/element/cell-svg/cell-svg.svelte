<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    DISPLAY_IMAGE_ICON,
    Svg,
  } from '@sveadmin/element'

  import {
    SETTING_DISPLAY_MODE,
    SETTING_DISPLAY_NAME,
    SETTING_GET_DISPLAY_NAME,
    SETTING_GET_VALUE,
    TableContext,
    TableContextKey,
  } from '../../types.js'


  export let column: string,
    contextKey: TableContextKey,
    value: string

  const {
    settings
  } = getContext(contextKey) as TableContext

  let {
    [SETTING_DISPLAY_MODE]: displayMode = DISPLAY_IMAGE_ICON,
    [SETTING_DISPLAY_NAME]: title,
    [SETTING_GET_DISPLAY_NAME]: getDisplayName,
    [SETTING_GET_VALUE]: getValue,
  } = settings.getColumn(column)

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }

    if (!title
      && getDisplayName) {
      title = getDisplayName()
    }
  })

</script>
{#if value !== null}
  <sveadatacellcontent>
    <Svg
      {displayMode}
      {title}
      {value} />
  </sveadatacellcontent>
{/if}