<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import {
    dataParser,
    normalizeArray,
    propertyMerger,
  } from '$lib/helper/index.js'
  
  import type {
    TextDisplayProps,
    TextDisplayWrappedProps,
  } from  './types.js'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from './text-display.svelte'

  import './text-display.css'

  let {
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = {},
    instance = $bindable({ref: undefined}),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isFloating = false,
    isInputBorderDisplayed = false,
    literalClass = $bindable([]),
    literalStyle = $bindable([]),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    textClass = $bindable([]),
    textStyle = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : TextDisplayWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';'))

  const literalConfig : TextDisplayProps = $derived(propertyMerger(
    childrenConfig?.literal,
    childrenConfig?.[1],
    {
      class: literalClass,
      style: literalStyle,
    }
  ))

  const textConfig : TextDisplayProps = $derived(propertyMerger(
    childrenConfig?.text,
    childrenConfig?.[0],
    {
      class: textClass,
      style: textStyle,
    }
  ))

  let derivedClasses = $derived(classes.concat(localClasses))

  if (isFloating) {
    localClasses.push('floating')
  } else {
    if (isAttachedOnLeft) {
      localClasses.push('attachLeft')
    }
    if (isAttachedOnRight) {
      localClasses.push('attachRight')
    }
    if (isInputBorderDisplayed
      || isAttachedOnLeft
      || isAttachedOnRight) {
      localClasses.push('inputBorder')
    }
  }

  let childrenPassthroughConfig = $derived([
    literalConfig,
  ])
</script>

<sveatextcontainer class={derivedClasses.join(' ')}
  data-size={size}
  {...dataParsed}
  style={styles.join(';')} >
  <TextDisplay childrenConfig={childrenPassthroughConfig}
    {size}
    {...textConfig}
    {...passthrough}
    bind:value />
</sveatextcontainer>
