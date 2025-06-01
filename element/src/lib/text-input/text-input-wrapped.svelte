<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextInput from './text-input.svelte'
  import TextInputPlaceholder from './text-input-placeholder.svelte'

  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    TextInputProps,
    TextInputWrappedProps,
  } from './types.js'


  let {
    childrenClass,
    childrenStyle,
    class: classList = $bindable([]),
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    input,
    placeholder = $bindable(''),
    style = $bindable([]),
    useSimplePlaceholder = false,
    value = $bindable(''),
    ...passthrough
  } : TextInputWrappedProps = $props()

  let childrenClasses: string[] = $state(normalizeArray(childrenClass, ' ')),
    classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';')),
    inFocus = $state(false)

  const isEmpty = $derived(!value)

  const setInFocus = () => inFocus = true
  const unsetInFocus = () => inFocus = false

  if (!useSimplePlaceholder) {
    childrenClasses.push('extraplaceholder')
  }

  const childrenProps: TextInputProps = {
    ...passthrough,
    class: childrenClasses.join(' '),
    id,
    style: childrenStyle,
    value,
  }

  if (useSimplePlaceholder) {
    childrenProps.placeholder = placeholder
  } else {
    childrenProps.onFocus = setInFocus
    childrenProps.onBlur = unsetInFocus
  }

</script>

<inputcontainer
  class={classes.join(' ')}
  style={styles.join(';')}>
  {#if input}
    {@render input(childrenProps)}
  {:else}
    <TextInput {...childrenProps} bind:id bind:value />
  {/if}
  {#if !useSimplePlaceholder}
    <TextInputPlaceholder {id} {inFocus} {isEmpty} {placeholder} />
  {/if}
</inputcontainer>
