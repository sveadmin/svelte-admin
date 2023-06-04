<script lang="ts">
  import {
    getContext,
    onMount,
  } from 'svelte'

  import {
    DISPLAY_IMAGE_ICON,
    Image,
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
    [SETTING_DISPLAY_NAME]: alt,
    [SETTING_GET_DISPLAY_NAME]: getDisplayName,
    [SETTING_GET_VALUE]: getValue,
  } = settings.getColumn(column)

  onMount(() => {
    if (!value
      && getValue) {
      value = getValue()
    }

    if (!alt
      && getDisplayName) {
      alt = getDisplayName()
    }
  })

</script>
{#if value}
  <sveadatacellcontent>
    <Image
      {alt}
      {displayMode}
      src={value} />
  </sveadatacellcontent>
{/if}