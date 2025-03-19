<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import {
    normalizeArray,
    shake,
  } from '$lib/helper/index.js'

  // import './text-input.css'

  import InputError from './input-error.svelte'
  import InputLabel from './input-label.svelte'
  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    InputProps,
  } from './types.js'

  let {
    areErrorsVisible = false,
    class: classList = $bindable([]),
    error,
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    input,
    isDisabled = $bindable(false),
    label,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    onError,
    style = $bindable([]),
    validators = createFieldValidator([]),
    value = $bindable(''),
    ...passthrough
  } : InputProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    derivedClasses: string[] = $state([]),
    localClasses: string[] = $state([]),
    textPadding = shake()

  $effect(() => {
    derivedClasses = classes.concat(localClasses)
  })

  $effect(() => {
    if (!validators.result.valid) {
      untrack(() => {
        status.add({message: validators.result.message ?? '', type: 'error'})
        textPadding.shake()
      });
      if (typeof onError === 'function') {
        onError(new Error(
          validators.result.message,
          {
            cause: {
              code: validators.result.error,
              value: value,
            }
          }
        ))
      }
    }
  })

  //Separated so class changes do not resend errors
  $effect(() => {
    const index = localClasses.indexOf('error')
    if (validators.result.valid) {
      if (index !== -1) {
        localClasses.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      localClasses.push('error')
    }
  })
</script>

{#if label}
  {#if typeof label === 'function'}
    {@render label()}
  {:else}
    <InputLabel {id}
      {label}
      class={labelClass}
      style={labelStyle} />
  {/if}
{/if}
{#if typeof input === 'function'}
  {@render input({
    class: derivedClasses,
    isDisabled,
    label,
    labelClass,
    labelStyle,
    validators,
    value,
    ...passthrough
  })}
{:else}
  <TextInput bind:class={derivedClasses}
    bind:isDisabled={isDisabled}
    {validators}
    bind:style={style}
    bind:value={value}
    {...passthrough} />
{/if}
{#if areErrorsVisible}
  {#if typeof error === 'function'}
    {@render error(validators.result)}
  {:else}
    <InputError isValid={validators.result} />
  {/if}
{/if}