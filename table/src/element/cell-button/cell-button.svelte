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
    DataData,
    RowAttributes,
    TableContext,
    TableContextKey
  } from '../../types.js'

  export let callback: ((rowAttributes: RowAttributes) => void) = noop,
    contextKey: TableContextKey,
    icon: string,
    label: string = 'Do',
    rowIndex: number
  
  let data: DataData

  const context = getContext(contextKey) as TableContext

  context.data.subscribe((currentValue: DataData) => data = currentValue)

  const makeCallback = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    callback(data[rowIndex].attributes)
  }
</script>
<Button
  callback={makeCallback}
  {icon}
  {label}
  />