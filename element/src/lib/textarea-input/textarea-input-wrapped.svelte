<script lang="ts">
  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import type {
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
  } from '$lib/text-display/index.js'

  import {
    TextInputPlaceholder,
  } from '$lib/text-input/index.js'
  
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextareaInput from './textarea-input.svelte'

  import type {
    TextareaInputProps,
    TextareaWrappedInputProps,
  } from './types.js'

  import './textarea-input.css'

  let {
    childrenConfig,
    class: classList = $bindable([]),
    componentConfig,
    id = $bindable('textarea-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    placeholder,
    size = SIZE_MEDIUM,
    style = $bindable([]),
    textareaClass = $bindable([]),
    textareaStyle = $bindable([]),
    value = $bindable(''),
    ...passthrough
  } : TextareaWrappedInputProps = $props()

  const Component = componentConfig?.textarea?.component
    || componentConfig?.[1]?.component
    || TextareaInput

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    inFocus = $state(false),
    isEmpty = $derived(!value), 
    placeholderClasses: string[] = $state(['inputplaceholder']),
    placeholderHidden: boolean = $state(false),
    styles: string[] = $derived(normalizeArray(style, ';'))

  const setInFocus = () => inFocus = true
  const unsetInFocus = () => inFocus = false

  const hidePlaceholder = () => {
    placeholderHidden = true
    return true
  }
  const showPlaceholder = () => {
    placeholderHidden = false
    return true
  }

  const textareaConfig : TextareaInputProps = $derived(mergeProperties(
    passthrough,
    childrenConfig?.textarea,
    childrenConfig?.[1],
    componentConfig?.literal?.input?.config,
    componentConfig?.[1]?.input?.config,
    {
      class: textareaClass,
      id,
      onBlur: unsetInFocus,
      onDragEnter: hidePlaceholder,
      onDragLeave: showPlaceholder,
      onFocus: setInFocus,
      size,
      style: textareaStyle,
    }
  ))
</script>

<inputcontainer
  class={classes.join(' ')}
  data-size={size}
  style={styles.join(';')}>
  <Component {...textareaConfig}
    {childrenConfig}
    {componentConfig}
    bind:id
    bind:instance
    bind:value />
  <TextInputPlaceholder class={placeholderClasses}
    {id}
    {isEmpty}
    {inFocus}
    isHidden={placeholderHidden}
    {placeholder} />
</inputcontainer>