<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    dataParser,
    normalizeArray,
  } from '$lib/helper/index.js'
  
  import type {
    LiteralDisplayProps,
  } from  './types.js'

  import './literal.css'

  let {
    children,
    class: classList = $bindable([]),
    data = {},
    instance = $bindable({ref: undefined}),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    value,
  } : LiteralDisplayProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    styles: string[] = $state(normalizeArray(style, ';'))

</script>

<svealiteral class={classes.join(' ')}
  {...dataParsed}
  data-size={size}
  style={styles.join(';')}>
  {#if children}
    {@render children()}
  {:else}
    {value}
  {/if}
</svealiteral>