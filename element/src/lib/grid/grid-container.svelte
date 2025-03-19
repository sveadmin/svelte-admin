<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    GridContainerProps,
  } from './types.js'

  // import './grid-container.css'

  const {
    children,
    class: classList = $bindable([]),
    style = $bindable([]),
    span = 1
  } : GridContainerProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';'))

  let derivedClasses = $derived(classes.concat(localClasses))

  localClasses.push(`container-grid-span-${span}`)

</script>

<sveagrid class={derivedClasses.join(' ')} style={styles.join(';')}>
  {@render children?.()}
</sveagrid>

<style global src="./grid-container.css"></style>