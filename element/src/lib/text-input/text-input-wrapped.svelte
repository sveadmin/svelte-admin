<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextInput from './text-input.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextInputPlaceholder from './text-input-placeholder.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    TextInputProps,
    TextWrappedInputProps,
  } from './types.js'


  let {
    childrenClass,
    childrenStyle,
    class: classList = $bindable([]),
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    input,
    placeholder = $bindable(''),
    size,
    style = $bindable([]),
    useSimplePlaceholder = false,
    value = $bindable(''),
    ...passthrough
  } : TextWrappedInputProps = $props()

  let childrenClasses: string[] = $state(normalizeArray(childrenClass, ' ')),
    classes: string[] = $state(normalizeArray(classList, ' ')),
    placeholderClasses: string[] = $state(['inputplaceholder']),
    placeholderHidden: boolean = $state(false),
    styles: string[] = $state(normalizeArray(style, ';')),
    inFocus = $state(false)

  const isEmpty = $derived(!value)

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

  if (!useSimplePlaceholder) {
    childrenClasses.push('extraplaceholder')
  }

  const childrenProps: TextInputProps = {
    ...passthrough,
    class: childrenClasses.join(' '),
    id,
    size,
    style: childrenStyle,
    value,
  }

  if (useSimplePlaceholder) {
    childrenProps.placeholder = placeholder
  } else {
    childrenProps.onBlur = unsetInFocus
    childrenProps.onDragEnter = hidePlaceholder
    childrenProps.onDragLeave = showPlaceholder
    childrenProps.onFocus = setInFocus
  }

</script>

<inputcontainer
  class={classes.join(' ')}
  data-size={size}
  style={styles.join(';')}>
  {#if input}
    {@render input(childrenProps)}
  {:else}
    <TextInput {...childrenProps} bind:id bind:value />
  {/if}
  {#if !useSimplePlaceholder}
    <TextInputPlaceholder class={placeholderClasses}
      {id}
      {isEmpty}
      {inFocus}
      isHidden={placeholderHidden}
      {placeholder} />
  {/if}
</inputcontainer>
