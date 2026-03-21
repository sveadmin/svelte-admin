<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    dataParser,
    normalizeArray,
    propertyMerger,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'
  
  import {
    Literal,
  } from '$lib/literal/index.js'

  import type {
    TextDisplayProps,
  } from  './types.js'

  import {
    prepareCopyValue,
  } from './action/index.js'

  import './text-display.css'

  let {
    children,
    childrenConfig,
    class: classList = $bindable([]),
    data = {},
    instance = $bindable({ref: undefined}),
    isCopyingEnabledOnClick = false,
    literalClass = $bindable([]),
    literalStyle = $bindable([]),
    onClick,
    size = SIZE_MEDIUM,
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : TextDisplayProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    onElementClick = (isCopyingEnabledOnClick)
      ? wrapOnMouseAction(prepareCopyValue(() => value), onClick)
      : onClick,
    styles: string[] = $state(normalizeArray(style, ';'))


  const literalConfig : TextDisplayProps = $derived(propertyMerger(
      passthrough,
      childrenConfig?.literal,
      childrenConfig?.[0],
      {
        class: literalClass,
        style: literalStyle
      },
    ))

</script>

<sveatext class={classes.join(' ')}
  {...dataParsed}
  data-size={size}
  onclick={onElementClick}
  style={styles.join(';')}
  bind:this={instance.ref} >
  {#if children}
    {@render children()}
  {:else}
    <Literal {...literalConfig} bind:value/>
  {/if}
</sveatext>