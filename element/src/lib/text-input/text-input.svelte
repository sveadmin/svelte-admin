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
    normalizeVisibleWidth,
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
  } from '$lib/input/action/index.js'

  import {
    INPUT_TYPE_TEXT,
  } from './types.js'

  import type {
    TextInputProps,
  } from './types.js'

  let {
    autoFocus = false,
    class: classList = $bindable([]),
    getValidationData = () => {return {}},
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable(),
    isDisabled = $bindable(false),
    keyMap = {},
    name,
    onBlur,
    onChange,
    onError,
    onFocus = (event?: Event) => {},
    onInit = () => {},
    onKeyup,
    placeholder = $bindable(''),
    style = $bindable([]),
    type = INPUT_TYPE_TEXT,
    validateWhenLoaded = false,
    validateWhileTyping = true,
    validators = createFieldValidator([]),
    value = $bindable(''),
    visibleWidth,
  } : TextInputProps = $props()

  let classes: string[] = $state(normalizeArray(classList, ' ')),
    styles: string[] = $state(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
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

  if (visibleWidth) {
    const newStyle = normalizeVisibleWidth(visibleWidth)
    if (newStyle) {
      const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
      if (styledProperties.indexOf(newProperty) === -1) {
        styles.push(newStyle)
      }
    }
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

  //Separated so class changes do not resend errors
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
  {placeholder}
  style={styles.join(';')}
  style:margin-left={$textPadding+'rem'}
  {type}
  use:init
  bind:this={instance}
  bind:value >