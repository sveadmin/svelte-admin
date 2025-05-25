<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

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
    prepareInputOnKeydown,
    prepareInputOnKeyup,
    prepareValidateValue,
  } from '$lib/input/action/index.js'

  import type {
    TextInputProps,
  } from './types.js'

  let {
    autoFocus = false,
    class: classList = $bindable([]),
    data = $bindable({}),
    getValidationData = () => {return {}},
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable(),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isDisabled = $bindable(false),
    keyMap = {},
    name,
    onBlur,
    onChange,
    onError,
    onFocus = (event?: Event) => {},
    onInit = () => {},
    onKeydown,
    onKeyup,
    placeholder = $bindable(''),
    style = $bindable([]),
    type = TEXT_INPUT_TYPE_TEXT,
    validateWhenLoaded = false,
    validateWhileTyping = true,
    validators = createFieldValidator([]),
    value = $bindable(''),
    visibleWidth,
  } : TextInputProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived.by(() => {
      return Object.keys(data).reduce((aggregator: {[key: string] : string}, currentKey: string) => {
        aggregator['data-' + currentKey] = data[currentKey]
        return aggregator
      }, {})
    }),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    textPadding = shake()

  let derivedClasses = $derived(classes.concat(localClasses))

  const defaultKeyMap = {
    'Enter': () => {focusNext(instance); return false}
  }

  const focus = prepareFocus(onFocus)
  const init = prepareInit(autoFocus, focus, onInit)
  const validateValue = prepareValidateValue(validators, getValidationData)
  const onInputBlur = prepareInputOnBlur(validators, onBlur)
  const onInputChange = prepareInputOnChange(validators, onChange)
  const onInputKeydown = prepareInputOnKeydown(
    {
      ...defaultKeyMap,
      ...keyMap
    },
    onKeydown
  )
  const onInputKeyUp = prepareInputOnKeyup(
    {
      ...defaultKeyMap,
      ...keyMap
    },
    validateValue,
    validateWhileTyping,
    onKeyup
  )

  // if (typeof registerNestedValidator === 'function') {
  //   registerNestedValidator(validators, () => {
  //     return value
  //   })
  // }
  // if (typeof registerNestedValidator === 'function') {
  //   registerNestedValidator(validators, () => value)
  // }

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
              target: instance,
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

  if (isAttachedOnLeft) {
    localClasses.push('attachLeft')
  }
  if (isAttachedOnRight) {
    localClasses.push('attachRight')
  }
</script>

<input
  {...dataParsed}
  aria-invalid={!validators.result.valid}
  class={derivedClasses.join(' ')}
  disabled={isDisabled}
  id={id}
  name={name ?? id}
  onblur={onInputBlur}
  onchange={onInputChange}
  onfocus={onFocus}
  onkeydown={onInputKeydown}
  onkeyup={onInputKeyUp}
  {placeholder}
  style={styles.join(';')}
  style:margin-left={$textPadding+'rem'}
  {type}
  use:init
  bind:this={instance}
  bind:value >