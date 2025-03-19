<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import DateDisplay from './date-display.svelte'
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    DateDisplayProps,
    DateDisplayWrappedProps,
  } from './types.js'

  let {
    class: classList = $bindable([]),
    style = $bindable([]),
    ...passthrough
  } : DateDisplayWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const childrenProps: DateDisplayProps = {
    ...passthrough,
  }
</script>

<sveadatecontainer class={classes.join(' ')} style={styles.join(';')}>
  <DateDisplay {...childrenProps}/>
</sveadatecontainer>