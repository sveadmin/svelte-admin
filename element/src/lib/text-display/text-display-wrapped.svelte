<script lang="ts">
  import {
    BUTTON_LEVEL_OUTLINE,
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
    import { derived } from 'svelte/store';

  let {
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    data = {},
    displayComponent = TextDisplay,
    instance = $bindable({ref: undefined}),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isFloating = false,
    isOutlineVisible = false,
    literalClass = $bindable([]),
    literalStyle = $bindable([]),
    size = SIZE_MEDIUM,
    style = $bindable([]),
    textClass = $bindable([]),
    textStyle = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : TextDisplayWrappedProps = $props()

  let Component = displayComponent //This is needed so Svelte can render it as a tag

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    localClasses: string[] = $derived.by(() => {
      const classes = []
      if (isFloating) {
        classes.push('floating')
      } else {
        if (isAttachedOnLeft) {
          classes.push('attachLeft')
        }
        if (isAttachedOnRight) {
          classes.push('attachRight')
        }
        if (isOutlineVisible
          || isAttachedOnLeft
          || isAttachedOnRight) {
          classes.push(BUTTON_LEVEL_OUTLINE)
        }
      }
      return classes
    }),
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


  let childrenPassthroughConfig = $derived([
    literalConfig,
  ])
</script>

<sveatextcontainer class={derivedClasses.join(' ')}
  data-size={size}
  {...dataParsed}
  style={styles.join(';')} >
  <Component childrenConfig={childrenPassthroughConfig}
    {size}
    {...textConfig}
    {...passthrough}
    bind:value />
</sveatextcontainer>
