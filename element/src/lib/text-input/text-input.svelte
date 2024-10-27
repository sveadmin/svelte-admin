<script lang="ts">
  import {
    createFieldValidator,
    type ValidatorStore,
  } from '@sveadmin/common'

  import {
    shake,
    focusNext
  } from '$lib/helper/index.js'

  import {
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
    class: classList = $bindable([]),
    getValidationData = () => {return {}},
    id = 'text-input-' + Math.random().toString(36).substring(2, 6),
    isDisabled = $bindable(false),
    keyMap = {},
    onBlur,
    onChange,
    onError,
    onFocus = () => {},
    onKeyup,
    setFocus = false,
    style = $bindable([]),
    type = INPUT_TYPE_TEXT,
    validateWhileTyping = true,
    validators = createFieldValidator([]),
    value = $bindable('')
  } : TextInputProps = $props()

  let instance: HTMLInputElement,
    classes: string[] = $state([]),
    styles: string[] = $state([]),
    textPadding = shake()

  if (Array.isArray(classList)) {
    classes = classList
  } else {
    classes.push(...classList.split(' '))
  }

  if (Array.isArray(style)) {
    styles = style
  } else {
    styles.push(...style.split(';'))
  }

  const defaultKeyMap = {
    'Enter': () => {focusNext(instance); return false}
  }

  const init = (el: HTMLElement) => {
    if (setFocus) {
      el.focus()
    }
  }

  const validateValue = prepareValidateValue(validators, getValidationData, textPadding)
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

  $effect(() => {
    const index = classes.indexOf('error')
    if (validators.result.valid) {
      if (areErrorsVisible
        && index !== -1) {
        classes.splice(index, 1)
      }
      return
    }
    if (areErrorsVisible
      && index === -1) {
      classes.push('error')
    }

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
  })
</script>

<input
  class={classes.join(' ')}
  disabled={isDisabled}
  id={id}
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