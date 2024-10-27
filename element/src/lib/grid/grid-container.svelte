<script lang="ts">
  import type {
    GridContainerProps,
  } from './types.js'

  const {
    children,
    class: classList = $bindable([]), 
    span = 1
  } : GridContainerProps = $props()

  let classes: string[] = $state([])

  if (Array.isArray(classList)) {
    classes = classList
  } else {
    classes.push(...classList.split(' '))
  }

  classes.push(`container-grid-span-${span}`)

</script>

<sveagrid class={classes.join(' ')}>
  {@render children?.()}
</sveagrid>

<style global src="./grid-container.css"></style>