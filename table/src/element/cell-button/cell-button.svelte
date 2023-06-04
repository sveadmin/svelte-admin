<script lang="ts">
  import {
    getContext,
  } from 'svelte'

  import {
    noop,
  } from 'svelte/internal'

  import {
    Button,
  } from '@sveadmin/element'

  import {
    SETTING_CALLBACK,
    SETTING_DISPLAY_NAME,
    SETTING_ICON,
    TableContext,
    TableContextKey
  } from '../../types.js'

  export let column: string,
    contextKey: TableContextKey,
    rowIndex: number

  const {
    data,
    settings,
  } = getContext(contextKey) as TableContext

  const {
    [SETTING_CALLBACK]: callback = noop,
    [SETTING_DISPLAY_NAME]: label = 'Do',
    [SETTING_ICON]: icon,
  } = settings.getColumn(column)

  const makeCallback = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    callback(data.getRowAttributes(rowIndex))
  }
</script>
<Button
  callback={makeCallback}
  {icon}
  {label}
  />