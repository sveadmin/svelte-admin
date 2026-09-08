<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import type {
    KeyMap,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    ariaParser,
    dataParser,
    normalizeArray,
    normalizeVisibleSizeExactKey,
    mergeProperties,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'

  import {
    Literal,
  } from '$lib/literal/index.js'

  import type {
    LiteralDisplayProps,
    ComponentLiteral,
  } from '$lib/literal/index.js'

  import {
    prepareCopyValue,
  } from '$lib/text-display/action/index.js'

  import type {
    TextareaInputProps,
  } from './types.js'

  import './textarea-input.css'

  let {
    aria = {},
    children,
    childrenConfig,
    class: classList = $bindable([]),
    componentConfig,
    data = {},
    id = $bindable('textarea-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    isCopyingEnabledOnClick = false,
    isHeightAutoAdjusted = false,
    literalClass = $bindable([]),
    literalStyle = $bindable([]),
    maxHeight,
    onClick,
    placeholder,
    resize,
    size = SIZE_MEDIUM,
    spellcheck = false,
    style = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : TextareaInputProps = $props()

  const Component = componentConfig?.literal?.component
    || componentConfig?.[0]?.component
    || Literal

  let ariaParsed: {[key: string] : string} = $derived(ariaParser(aria)),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    onElementClick = (isCopyingEnabledOnClick)
      ? wrapOnMouseAction(prepareCopyValue(() => value), onClick)
      : onClick,
    styles: string[] = $derived(normalizeArray(style, ';')),
    valueGuard: string | number | null = null

  // Add sanitization logic
  let valueSanitized = $derived.by(() => {
    if (typeof children === 'function') {
      console.log(children)
    }
    
    return value ?? ''
  })

  let valueHelper: ValueHelperStore = $derived({
      display: valueSanitized,
      value: valueSanitized,
    })

  // $effect(() => {
  //   // This is needed as the Proxy value gets "cached" before tick, and can revert the value back to the original
  //   if (valueGuard !== valueHelper.value) {
  //     const parsedValue =  parseFloat(valueHelper.value?.toString().replace(',', '.') ?? '')
  //     value = (isNaN(parsedValue))
  //       ? null
  //       : parsedValue
  //     valueGuard = valueHelper.value
  //   }
  // })

  const literalConfig : LiteralDisplayProps = $derived(mergeProperties(
    passthrough,
    childrenConfig?.literal,
    childrenConfig?.[0],
    componentConfig?.literal?.display?.config,
    componentConfig?.[0]?.display?.config,
    {
      class: literalClass,
      style: literalStyle
    },
    {
      style: normalizeVisibleSizeExactKey(maxHeight, 'max-height')
    }
  ))

$inspect(value)

</script>

<sveatextarea {...ariaParsed}
  class={classes.join(' ')}
  contenteditable="true"
  {...dataParsed}
  data-size={size}
  onclick={onElementClick}
  {resize}
  {spellcheck}
  style={styles.join(';')}
  bind:this={instance.ref} >
  {#if children}
    {@render children()}
  {:else}
    <Component {...literalConfig} bind:value={valueHelper.display}/>
  {/if}
</sveatextarea>
<input {...dataParsed}
  {id}
  name={id}
  bind:this={instance.ref}
  type="hidden"
  {value} />