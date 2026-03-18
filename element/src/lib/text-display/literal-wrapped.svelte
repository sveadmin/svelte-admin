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
    LiteralDisplayProps,
    LiteralDisplayWrappedProps,
  } from  './types.js'


  import Literal from './literal_.svelte'

  import './literal.css'

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
    ...passthrough
  } : LiteralDisplayWrappedProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';'))


  const literalPropertyOverwrite = {
    class: literalClass,
    style: literalStyle,
  }

  const literalConfig : LiteralDisplayProps = $derived(propertyMerger(
    childrenConfig?.literal,
    childrenConfig?.[0],
    literalPropertyOverwrite
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


</script>

<svealiteralcontainer class={derivedClasses.join(' ')}
  data-size={size}
  {...dataParsed}
  style={styles.join(';')} >
  <Literal {size} {...literalConfig} {...passthrough} />
</svealiteralcontainer>
