<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    ariaParser,
    dataParser,
    normalizeArray,
    mergeProperties,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'
  
  import {
    Literal,
  } from '$lib/literal/index.js'

  import {
    prepareCopyValue,
  } from '$lib/text-display/action/index.js'

  import type {
    TextareaDisplayProps,
  } from  './types.js'

  import './textarea-display.css'

  let {
    aria = {},
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
  } : TextareaDisplayProps = $props()

  let ariaParsed: {[key: string] : string} = $derived(ariaParser(aria)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    onElementClick = (isCopyingEnabledOnClick)
      ? wrapOnMouseAction(prepareCopyValue(() => value), onClick)
      : onClick,
    styles: string[] = $derived(normalizeArray(style, ';'))


  const literalConfig : TextareaDisplayProps = $derived(mergeProperties(
      passthrough,
      childrenConfig?.literal,
      childrenConfig?.[0],
      {
        class: literalClass,
        style: literalStyle
      },
    ))

</script>

<sveatextarea {...ariaParsed}
  class={classes.join(' ')}
  {...dataParsed}
  data-size={size}
  onclick={onElementClick}
  style={styles.join(';')}
  bind:this={instance.ref} >
  {#if children}
    {@render children()}
  {:else}
    {@html value}
  {/if}
</sveatextarea>