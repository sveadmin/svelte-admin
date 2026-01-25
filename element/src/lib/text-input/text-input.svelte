<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import {
    wrapOnEvent,
    wrapOnInit,
    wrapOnInput,
    wrapOnKeyPress,
  } from '$lib/helper/index.js'

  import {
    SIZE_MEDIUM,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import {
    dataParser,
    focusNext,
    normalizeArray,
    normalizeVisibleSize,
    shake,
  } from '$lib/helper/index.js'

  import './text-input.css'

  import {
    prepareOnBlur,
    prepareInputOnChange,
    prepareInputOnInit,
    prepareInputOnKeyDown,
    prepareInputOnKeyUp,
    prepareOnFocus,
  } from '$lib/input/action/index.js'

  import type {
    TextInputProps,
  } from './types.js'

  let {
    allowedKeys,
    autoFocus = false,
    class: classList = $bindable([]),
    data = $bindable({}),
    id = $bindable('text-input-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    isAttachedOnLeft = false,
    isAttachedOnRight = false,
    isDisabled = $bindable(false),
    isValidationPerformedOnLoad = false,
    isValidationPerformedWhileTyping = true,
    keyMap = {},
    maximumLength,
    name,
    onBlur,
    onChange,
    onDragEnter,
    onDragLeave,
    onError,
    onFocus,
    onInit,
    onInput,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseUp,
    placeholder = $bindable(''),
    size,
    step,
    style = $bindable([]),
    type = TEXT_INPUT_TYPE_TEXT,
    validators = createFieldValidator([]),
    value = $bindable(),
    visibleWidth,
  } : TextInputProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    dataParsed: {[key: string] : string} = $derived(dataParser(data)),
    inFocus = $state({value: false}),
    initialized: boolean = $state(false),
    localClasses: string[] = $state([]),
    styles: string[] = $state(normalizeArray(style, ';')),
    styledProperties: string[] = $derived.by(() => {
      return styles.map(currentStlye => currentStlye.substring(0, currentStlye.indexOf(':')))
    }),
    textPadding = shake(),
    valueGuard: any

  let derivedClasses = $derived(classes.concat(localClasses))

  const defaultKeyMap = {
    'Enter': () => {focusNext(instance.ref as HTMLInputElement);return false}
  }

  const onInputBlur = wrapOnEvent(onBlur, prepareOnBlur(inFocus)),
    onInputChange = onChange,
    onInputFocus = wrapOnEvent(onFocus, prepareOnFocus(inFocus)),
    onInputInput = onInput
  // const onInputChange = (onChangeReceived)
  //   ? wrapOnEvent(onChangeReceived, prepareInputOnChange(validators))
  //   : prepareInputOnChange(validators)
  const onInputInit = wrapOnInit(onInit, prepareInputOnInit(autoFocus))
  // const onInputInput = (onInputReceived)
  //   ? wrapOnInput(onInputReceived, prepareInputOnInput(validators, isValidationPerformedWhileTyping))
  //   : prepareInputOnInput(validators, isValidationPerformedWhileTyping)

  const localKeyMap = {
    ...defaultKeyMap,
    ...keyMap
  }

  const onInputKeydown = wrapOnKeyPress(onKeyDown, prepareInputOnKeyDown(localKeyMap, allowedKeys))
  const onInputKeyUp = wrapOnKeyPress(onKeyUp, prepareInputOnKeyUp(
        localKeyMap,
        allowedKeys
      ))

  // if (typeof registerNestedValidator === 'function') {
  //   registerNestedValidator(validators, () => {
  //     return value
  //   })
  // }
  // if (typeof registerNestedValidator === 'function') {
  //   registerNestedValidator(validators, () => value)
  // }

  if (value === undefined) {
    value = ''
  }

  // if (isValidationPerformedOnLoad) {
  //   validators.validate(value)
  // }

  if (isAttachedOnLeft) {
    localClasses.push('attachLeft')
  }
  if (isAttachedOnRight) {
    localClasses.push('attachRight')
  }

  $effect(() => {
    if (visibleWidth) {
      const newStyle = normalizeVisibleSize(visibleWidth)
      if (newStyle) {
        const newProperty = newStyle.substring(0, newStyle.indexOf(':'))
        if (styledProperties.indexOf(newProperty) === -1) {
          styles.push(newStyle)
        }
      }
    }
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
              ...validators.result,
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
    let index : number = -1
    untrack(() => {
      index = localClasses.indexOf('error')
    })
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

  $effect(() => {
    initialized = initialized || inFocus.value
  })

  $effect(() => {
    if (initialized
      && value === valueGuard) {
      return
    }
    if (!initialized
      && !isValidationPerformedOnLoad) {
      return
    }
    if (inFocus.value
      && !isValidationPerformedWhileTyping) {
      return
    }

  console.log('------------', id, initialized
      && value === valueGuard, !initialized
      && !isValidationPerformedOnLoad, inFocus.value
      && !isValidationPerformedWhileTyping)

    // if (value !== valueGuard
    //   && (!inFocus.value
    //     || isValidationPerformedWhileTyping)
    //   && (initialized
    //     || isValidationPerformedOnLoad)
    // ) {
      validators.validate(value)
      valueGuard = value
      initialized = true
    // }
  })

  $inspect('vals', id, value, valueGuard, inFocus)
</script>

<input
  data-size={size}
  {...dataParsed}
  aria-invalid={!validators.result.valid}
  class={derivedClasses.join(' ')}
  disabled={isDisabled}
  id={id}
  data-maxlength={maximumLength}
  name={name ?? id}
  onblur={onInputBlur}
  onchange={onInputChange}
  ondragenter={onDragEnter}
  ondragleave={onDragLeave}
  onfocus={onInputFocus}
  oninput={onInputInput}
  onkeydown={onInputKeydown}
  onkeyup={onInputKeyUp}
  onmousedown={onMouseDown}
  onmouseup={onMouseUp}
  {placeholder}
  {step}
  style={styles.join(';')}
  style:margin-left={textPadding.current + 'rem'}
  {type}
  use:onInputInit
  bind:this={instance.ref}
  bind:value >