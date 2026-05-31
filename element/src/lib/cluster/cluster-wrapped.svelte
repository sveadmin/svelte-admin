<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import Cluster from './cluster.svelte'

  import {
    normalizeArray,
    mergeProperties,
  } from '$lib/helper/index.js'

  import type {
    ClusterWrappedDisplayProps,
  } from './types.js'

  let {
    childrenClass = $bindable([]),
    childrenConfig,
    childrenStyle = $bindable([]),
    class: classList = $bindable(),
    size,
    style = $bindable(),
    value = $bindable(''),
    ...passthrough
  } : ClusterWrappedDisplayProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let configParsed = $derived(mergeProperties(
    childrenConfig?.cluster,
    childrenConfig?.[0],
    {
      class: childrenClass,
      size,
      style: childrenStyle
    },
    passthrough
  ))
</script>
 
<clustercontainer
  class={classes.join(' ')}
  data-size={size}
  style={styles.join(';')}>
  <Cluster {childrenConfig}
    {...configParsed}
    bind:value />
</clustercontainer>
