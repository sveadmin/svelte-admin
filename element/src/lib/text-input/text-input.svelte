<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import {
    focusNext,
    normalizeArray,
    shake,
  } from '$lib/helper/index.js'

  import './text-input.css'

  import {
    prepareFocus,
    prepareInit,
    prepareInputOnBlur,
    prepareInputOnChange,
    prepareInputOnKeyup,
    prepareValidateValue,
  } from './action/index.js'

  import {
    INPUT_TYPE_TEXT,
  } from './types.js'

  import type {
    TextInputProps,
  } from './types.js'

  let {
    areErrorsVisible = false,
    autoFocus = false,
    class: classList = $bindable([]),
    getValidationData = () => {return {}},
    id = 'text-input-' + Math.random().toString(36).substring(2, 6),
    instance = $bindable(),
    isDisabled = $bindable(false),
    keyMap = {},
    label,
    labelClass = $bindable([]),
    labelStyle = $bindable([]),
    name,
    onBlur,
    onChange,
    onError,
    onFocus = (event?: Event) => {},
    onInit = () => {},
    onKeyup,
    style = $bindable([]),
    type = INPUT_TYPE_TEXT,
    validateWhenLoaded = false,
    validateWhileTyping = true,
    validators = createFieldValidator([]),
    value = $bindable('')
  } : TextInputProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    labelClasses: string[] = $state(normalizeArray(labelClass, ' ')),
    labelStyles: string[] = $state(normalizeArray(labelStyle, ';')),
    styles: string[] = $state(normalizeArray(style, ';')),
    textPadding = shake()

  const defaultKeyMap = {
    'Enter': () => {focusNext(instance); return false}
  }

  const focus = prepareFocus(onFocus)
  const init = prepareInit(autoFocus, focus, onInit)
  const validateValue = prepareValidateValue(validators, getValidationData)
  const onInputBlur = prepareInputOnBlur(validators, onBlur)
  const onInputChange = prepareInputOnChange(validators, onChange)
  const onInputKeyUp = prepareInputOnKeyup(
    {
      ...defaultKeyMap,
      ...keyMap
    },
    validateValue,
    validateWhileTyping,
    onKeyup
  )

  if (validateWhenLoaded) {
    validateValue(value)
  }

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

  //Separated so class changesdo not resend errors
  $effect(() => {
    const index = classes.indexOf('error')
    if (validators.result.valid) {
      if (index !== -1) {
        classes.splice(index, 1)
      }
      return
    }
    if (index === -1) {
      classes.push('error')
    }
  })

</script>


{#if label}
  <label 
    class={labelClasses.join(' ')}
    for={id}
    style={labelStyles.join(';')} >
    {#if typeof label === 'function'}
      {@render label()}
    {:else}
      {label}
    {/if}
  </label>
{/if}
<input
  aria-invalid={!validators.result.valid}
  class={classes.join(' ')}
  disabled={isDisabled}
  id={id}
  name={name ?? id}
  onblur={onInputBlur}
  onchange={onInputChange}
  onfocus={onFocus}
  onkeyup={onInputKeyUp}
  style={styles.join(';')}
  style:margin-left={$textPadding+'rem'}
  {type}
  use:init
  bind:this={instance}
  bind:value >
{#if areErrorsVisible && !validators.result.valid}
  <inputerror>{validators.result.message}</inputerror>
{/if}