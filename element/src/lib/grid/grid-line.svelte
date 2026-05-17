<script lang="ts">
  import {
    ariaParser,
    dataParser,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    GridLineProps,
  } from './types.js'

  import './grid-line.css'

  const {
    aria = {},
    children,
    class: classList = $bindable([]),
    data = {},
    style = $bindable([]),
  } : GridLineProps = $props()

  let ariaParsed: {[key: string] : string} = $derived(ariaParser(aria)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    styles: string[] = $derived(normalizeArray(style, ';'))
</script>

<sveagridline {...ariaParsed}
  class={classes.join(' ')}
  {...dataParsed}
  style={styles.join(';')} >
  {@render children?.()}
</sveagridline>