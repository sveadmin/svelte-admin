<script lang="ts">
  import {
    normalizeArray,
  } from '$lib/helper/index.js'
  
  import {
    HREF_TARGET_SELF,
  } from './types.js'
  
  import type {
    LinkProps,
  } from './types.js'

  let {
    baseUrl,
    children,
    class: classList = $bindable([]),
    name = $bindable(''),
    namedParameters = $bindable({}),
    onClick,
    onMouseDown,
    onMouseUp,
    routeGenerator,
    style = $bindable([]),
    target = HREF_TARGET_SELF,
    value = $bindable(),
  } : LinkProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    styles: string[] = $derived(normalizeArray(style, ';'))

  let url = $derived.by(() => {
    if (!routeGenerator) {
      return baseUrl
    }
    return routeGenerator(baseUrl, name, namedParameters)
  })

</script>
<a class={classes.join(' ')}
  href={url}
  style={styles.join(' ')}
  {target}
  onclick={onClick}
  onmousedown={onMouseDown}
  onmouseup={onMouseUp}
>
  {#if children}
    {@render children(value)}
  {:else}
    {value}
  {/if}
</a>
