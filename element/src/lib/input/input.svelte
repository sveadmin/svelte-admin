<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import type {
    SveadminElementConfig,
  } from '$lib/types.js'

  import {
    normalizeArray,
    mergeProperties,
    shake,
  } from '$lib/helper/index.js'

  // import './text-input.css'

  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import InputError from './input-error.svelte'
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import InputLabel from './input-label.svelte'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    InputErrorProps,
    InputLabelProps,
    InputProps,
  } from './types.js'

  import './input.css'

  let {
    areErrorsVisible = false,
    children,
    childrenConfig = $bindable({}),
    class: classList = $bindable([]),
    component,
    componentConfig = $bindable({}),
    error,
    errorClass = $bindable([]),
    errorStyle = $bindable([]),
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    input,
    instance = $bindable({ref: undefined}),
    isDisabled = $bindable(false),
    isLabelVisible = $bindable(true),
    label,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    onError,
    size,
    style = $bindable([]),
    validators = createFieldValidator([]),
    value = $bindable(''),
    ...passthrough
  } : InputProps = $props()

  const Component = component
    ?? componentConfig?.input?.component
    ?? componentConfig?.[0]?.component
    ?? TextInput,
    ErrorComponent = componentConfig?.error?.component
    ?? componentConfig?.[2]?.component
    ?? InputError,
    LabelComponent = componentConfig?.label?.component
    ?? componentConfig?.[1]?.component
    ?? InputLabel

  let isRequired: boolean = $derived(validators?.identities.indexOf('required') > -1)

  const errorConfig : InputErrorProps = $derived(mergeProperties(
    childrenConfig?.error,
    childrenConfig?.[2],
    componentConfig?.error?.display?.config,
    componentConfig?.[2]?.display?.config,
    {
      class: errorClass,
      isValid: validators.result,
      size,
      style: errorStyle
    }
  ) as InputErrorProps)

  const inputConfig : SveadminElementConfig = $derived(mergeProperties(
    {
      id,
      size,
      validators
    },
    childrenConfig?.input,
    childrenConfig?.[0],
    componentConfig?.input?.input?.config,
    componentConfig?.[0]?.input?.config,
    passthrough
  ))

  const labelConfig : InputLabelProps = $derived(mergeProperties(
    {
      label,
    },
    childrenConfig?.label,
    childrenConfig?.[1],
    componentConfig?.label?.display?.config,
    componentConfig?.[1]?.display?.config,
    {
      class: labelClass,
      id,
      isRequired,
      size,
      style: labelStyle
    }
  ) as InputLabelProps)

  let aria: {[key: string] : string} = $derived.by(() => {
      let aria: {[key: string] : string} = {}
      if (isRequired) {
        aria.required = 'true'
      }
      return aria
    }),
    classes: string[] = $derived(normalizeArray(classList, ' ')),
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
              target: instance.ref,
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

// $inspect('VEC', validators, errorConfig)
// console.log('receivefd calslsl', classList)
// $inspect('Input derveidde cals', derivedClasses)
</script>

{#if isLabelVisible
  && labelConfig.label}
  {#if typeof labelConfig.label === 'function'}
    {@render labelConfig.label()}
  {:else}
    <LabelComponent {...labelConfig} />
  {/if}
{/if}
  {#if children}
    {@render children()}
  {:else}
    {#if typeof input === 'function'}
      {@render input(inputConfig)}
    {:else}
      <Component {aria}
        bind:class={derivedClasses}
        {...inputConfig}
        bind:isDisabled={isDisabled}
        bind:style={style}
        bind:instance={instance}
        bind:value={value} />
    {/if}
  {/if}
{#if areErrorsVisible}
  {#if typeof error === 'function'}
    {@render error(validators.result)}
  {:else}
    <ErrorComponent {...errorConfig} />
  {/if}
{/if}