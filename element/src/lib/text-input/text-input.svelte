<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    createFieldValidator,
    status,
  } from '@sveadmin/common'

  import {
    wrapOnBlur,
    wrapOnChange,
    wrapOnInit,
    wrapOnInput,
    wrapOnKeyPress,
  } from '$lib/helper/index.js'

  import {
    SIZE_MEDIUM,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import {
    focusNext,
    normalizeArray,
    normalizeVisibleSize,
    shake,
  } from '$lib/helper/index.js'

  import './text-input.css'

  import {
    prepareInputOnBlur,
    prepareInputOnChange,
    prepareInputOnInit,
    prepareInputOnInput,
    prepareInputOnKeyDown,
    prepareInputOnKeyUp,
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
    keyMap = {},
    maximumLength,
    name,
    onBlur:  onBlurReceived,
    onChange: onChangeReceived,
    onDragEnter,
    onDragLeave,
    onError,
    onFocus,
    onInit: onInitReceived,
    onInput: onInputReceived,
    onKeyDown: onKeyDownReceived,
    onKeyUp: onKeyUpReceived,
    placeholder = $bindable(''),
    size,
    step,
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
    'Enter': () => {focusNext(instance.ref as HTMLInputElement); console.log('FIRED', keyMap);return false}
  }

  const onInputBlur = (onBlurReceived)
    ? wrapOnBlur(onBlurReceived, prepareInputOnBlur(validators))
    : prepareInputOnBlur(validators)
  const onInputChange = (onChangeReceived)
    ? wrapOnChange(onChangeReceived, prepareInputOnChange(validators))
    : prepareInputOnChange(validators)
  const onInit = (onInitReceived)
    ? wrapOnInit(onInitReceived, prepareInputOnInit(autoFocus))
    : prepareInputOnInit(autoFocus)
  const onInputInput = (onInputReceived)
    ? wrapOnInput(onInputReceived, prepareInputOnInput(validators, validateWhileTyping))
    : prepareInputOnInput(validators, validateWhileTyping)

  const localKeyMap = {
    ...defaultKeyMap,
    ...keyMap
  }

  const onInputKeydown = (onKeyDownReceived)
    ? wrapOnKeyPress(onKeyDownReceived, prepareInputOnKeyDown(localKeyMap, allowedKeys))
    : prepareInputOnKeyDown(localKeyMap, allowedKeys)
  
  const onInputKeyUp = (onKeyUpReceived)
    ? wrapOnKeyPress(onKeyUpReceived, prepareInputOnKeyUp(
        localKeyMap,
        allowedKeys
      ))
    : prepareInputOnKeyUp(
      localKeyMap,
      allowedKeys
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
    validators.validate(value)
  }

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
$inspect('text-input', value)
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
  onfocus={onFocus}
  oninput={onInputInput}
  onkeydown={onInputKeydown}
  onkeyup={onInputKeyUp}
  {placeholder}
  {step}
  style={styles.join(';')}
  style:margin-left={textPadding.current + 'rem'}
  {type}
  use:onInit
  bind:this={instance.ref}
  bind:value >