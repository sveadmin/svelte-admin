<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import DateDisplay from './date-display.svelte'
  import {
    normalizeArray,
    mergeProperties,
  } from '$lib/helper/index.js'

  import type {
    DateDisplayProps,
    DateWrappedDisplayProps,
  } from './types.js'

  let {
    childrenConfig,
    class: classList = $bindable([]),
    componentConfig,
    style = $bindable([]),
    ...passthrough
  } : DateWrappedDisplayProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const dateConfig: DateDisplayProps = mergeProperties(
    childrenConfig?.date,
    childrenConfig?.[0],
    componentConfig?.date?.display?.config,
    componentConfig?.[0]?.display?.config,
    passthrough
  )
</script>

<sveadatecontainer class={classes.join(' ')} style={styles.join(';')}>
  <DateDisplay {...dateConfig}/>
</sveadatecontainer>