<script lang="ts">
  import {
    dataParser,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    GridLineProps,
  } from './types.js'

  import './grid-line.css'

  const {
    children,
    class: classList = $bindable([]),
    data = {},
    style = $bindable([]),
  } : GridLineProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    styles: string[] = $derived(normalizeArray(style, ';'))
</script>

<sveagridline class={classes.join(' ')} {...dataParsed} style={styles.join(';')}>
  {@render children?.()}
</sveagridline>