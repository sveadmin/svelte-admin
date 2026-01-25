<script lang="ts">
  import {
    untrack,
  } from 'svelte'

  import {
    allowedListValidator,
    createFieldValidator,
    i18n,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    Button,
  } from '$lib/button/index.js'


  import {
    wrapOnFocus,
  } from '$lib/helper/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import type {
    TextInputProps,
  } from '$lib/text-input/index.js'

  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import type {
    KeyMap,
    OptionIndexed,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    childParser,
    createOptionStore,
    createValueHelperStore,
    focusNext,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    DropdownSearchProps,
    SuggestedValuesProps,
    SuggestionStore,
  } from './types.js'

  import {
    prepareFocus,
    prepareInputOnBlur,
    prepareInit,
    prepareValidateValue,
    prepareSuggestionHandler,
    prepareSuggestionOnArrowDown,
    prepareSuggestionOnArrowUp,
    prepareSuggestionOnClick,
    prepareSuggestionOnEnter,
    prepareSuggestionOnEscape,
  } from './action/index.js'

  import {
    getDisplayValueDefault,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  import {
    renderCurrentValueDefault,
  } from './render-current-value.svelte'

  import {
    renderSuggestionDefault,
  } from './render-suggestion.svelte'

  import './dropdown-search.css'

  i18n.addMultipleLocales(translations)

  let {
    autoCompleteOnSingleSuggestion = false,
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    clearValueOnInit = $bindable(false),
    data = $bindable({}),
    getDisplayValue = getDisplayValueDefault,
    getKey,
    id = $bindable('dropdown-search-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable({ref: undefined}),
    inputComponent = TextInput,
    isCurrentValueVisible = $bindable(true),
    isEmptyAllowed = $bindable(true),
    isNewValueAllowed = $bindable(false),
    isSuggestionListOnTop = $bindable(false),
    isSuggestionListPinnable = $bindable(false),
    isSuggestionListVisible = $bindable(true),
    keyMap: keyMapReceived = {},
    onBlur : onBlurReceived,
    onChange : onChangeReceived,
    onError,
    onFocus : onFocusReceived,
    onKeyUp : onKeyUpReceived,
    renderCurrentValue = renderCurrentValueDefault,
    renderSuggestion = renderSuggestionDefault,
    suggestionsLength = $bindable(10),
    size,
    style = $bindable([]),
    validators = createFieldValidator([]), //To be able to read the errros supply an empty validator
    validationData,
    value = $bindable(''),
    values = $bindable([]),
    visibleWidth,
    ...passthrough
  } : DropdownSearchProps = $props()

  let Component = inputComponent //This is needed so Svelte can render it as a tag
  const childrenPropertyOverwrite = {
    class: childrenClass,
    style: childrenStyle,
  }
  const firstChild : TextInputProps = childParser(childrenConfig, 0, childrenPropertyOverwrite)
  const suggestedValuesProps : SuggestedValuesProps = childParser(childrenConfig, 1)
  const valueStore = (Array.isArray(values))
    ? createOptionStore(
        values,
        suggestionsLength,
        isEmptyAllowed,
        getKey,
        getDisplayValue
      )
    : values

  const validateValue = prepareValidateValue(validators, validationData)

  let classes = $derived(normalizeArray(classList, ' ')),
    isSuggestionListPinned = $state(false),
    styles = $derived(normalizeArray(style, ';')),
    suggestions: SuggestionStore = $state({
      list: [],
      selected: -1,
    }),
    valueHelper: ValueHelperStore = createValueHelperStore(value, valueStore.getKeyByValue(value))

  let componentData = $derived({...data, key: valueHelper.key ?? ''})

  let pinIcon = $derived((isSuggestionListPinned) ? 'pin-slash' : 'pin'),
    realSuggestions = $derived(suggestions.list.filter(v => v !== null))

  const suggestionSelect = prepareSuggestionOnEnter(suggestions, valueHelper, () => focusNext(instance?.ref as HTMLInputElement))

  const defaultKeyMap = {
    'Enter': suggestionSelect,
    'Escape': prepareSuggestionOnEscape(valueHelper),
    'ArrowUp': prepareSuggestionOnArrowUp(suggestions),
    'ArrowDown': prepareSuggestionOnArrowDown(suggestions),
  }

  const keyMap: KeyMap = {
    ...defaultKeyMap,
    ...keyMapReceived
  }

  const suggestionHandler = prepareSuggestionHandler(
    {
      generateSuggestions: valueStore.generateSuggestions,
      keyMap,
      onKeyUp: onKeyUpReceived,
      suggestions,
      valueHelper
    }
  )
  const onSuggestionClick = prepareSuggestionOnClick(valueHelper, () => focusNext(instance?.ref as HTMLInputElement))
  const onInputBlur = prepareInputOnBlur(valueHelper, valueStore, onBlurReceived)
  const onInputFocus = (onFocusReceived)
    ? wrapOnFocus(onFocusReceived, prepareFocus(clearValueOnInit, valueStore.generateSuggestions, valueHelper, suggestions))
    : prepareFocus(clearValueOnInit, valueStore.generateSuggestions, valueHelper, suggestions)
  const onInit = prepareInit(valueHelper, valueStore)
  const toggleFocus = (event?: Event) : boolean => {
    if (valueHelper.inputFocused) {
      instance?.ref?.blur()
      focusNext(instance as HTMLInputElement)
      return true
    } else {
      instance?.ref?.focus()
      return true
    }
  }

  const onMouseDown = () => valueHelper.suggestionSelectionInProgress = true

  const pinSuggestions = () => {
    isSuggestionListPinned = !isSuggestionListPinned
    valueHelper.suggestionSelectionInProgress = false
  }

  const getOption: () => OptionIndexed | undefined = () => valueStore.getOption(valueHelper.key)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator({lookupTable: () => valueStore.optionsMapped}))
  }

  if (!isEmptyAllowed) {
    validators.prependValidator(requiredValidator())
  }

let breaker = 0
  $effect(() => {
    if (!validators.result.valid
      && typeof onError === 'function'
    ) {
      onError(new Error(
        validators.result.message,
        {
          cause: {
            code: validators.result.error,
            value: valueHelper.value,
          }
        }
      ))
    }
  })
  $effect(() => {
    if (valueHelper.inputFocused
      // || breaker++ > 10
      ) {
      return
    }
    if (valueStore.getDisplayValue(valueHelper.key) === valueHelper.display) {
      return
    }

  untrack(() => {
    console.log('new effect fored', $state.snapshot(valueHelper), valueStore.getValue(valueHelper.key), valueHelper.value !== valueStore.getValue(valueHelper.key), validateValue(valueHelper.key))
  })

    if (valueHelper.value !== valueStore.getValue(valueHelper.key)) {
      // This happens when the valueHelper key is explicitly set, eg.: onSuggestionClick, onEnter, onBlur
      const isValid = validators.validate(valueHelper.key)
      if (!isValid.valid) {
        const maybeKey = valueStore.getKeyByValue(valueHelper.key)
        if (maybeKey) {
          const isValidByValue = validators.validate(maybeKey)
          if (isValidByValue.valid) {
            untrack(() => {
              valueHelper.key = maybeKey
              valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
            })
          } else {
            valueHelper.display = valueStore.getDisplayValue(valueHelper?.original) ?? valueHelper?.current?.toString()
          }
          return
        }
        // This case happens when a new value is entered
        valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
        return
      }

      //This aligns the key to the actual key, as sometimes the value entered can have different case
      untrack(() => {
        if (!valueStore.getOption(valueHelper.key)) {
          valueHelper.key = valueStore.getKeyByValue(isValid.validatedValue[0])
        }

        valueHelper.value = valueStore.getValue(valueHelper.key)
        if (valueHelper.value === '') {
          valueHelper.current = null
        }
        value = valueHelper.value
      })
      valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
      return
    } else {
      const displayString = (Array.isArray(valueHelper.display))
        ? valueHelper.display.join('')
        : valueHelper.display || undefined

      const newKey = valueStore.getKeyByValue(displayString)
      if (!valueHelper.key) {
        untrack(() => {
          if (newKey) {
            valueHelper.key = newKey ?? undefined
            valueHelper.value = valueStore.getValue(valueHelper.key)
          } else {
            valueHelper.key = displayString
            valueHelper.value = displayString ?? ''
          }
          valueHelper.original = valueHelper.key
          valueHelper.current = valueHelper.value
          value = valueHelper.value
        })
        } 
      valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
    }
  })

  $effect(() => {
    if (!value
      && value !== valueHelper.value) {
      untrack(() => {
        // This happens when the value for the dropdwon is cleared through the value binding
        valueHelper.key = valueStore.getKeyByValue(value)
        valueHelper.value = value
        valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
        // valueHelper.original = valueHelper.key
        // valueHelper.current = value
      })
    }
  })

  $effect(() => {
    if ((Array.isArray(values))) {
      valueStore.options = values
    }
  })
  
  $effect(() => {
    if (autoCompleteOnSingleSuggestion
      && realSuggestions.length === 1) {
      valueHelper.current = valueHelper.display
      valueHelper.key = realSuggestions[0]
      focusNext(instance?.ref as HTMLInputElement)
    }
  })

  // $inspect(value, valueHelper)
  // $inspect(suggestions)
</script>
<sveadropdowncontainer
  class={classes.join(' ')}
  class:flip={isSuggestionListOnTop}
  data-size={size}
  style={styles.join(';')} >
  <Component
    {...passthrough}
    {...firstChild}
    bind:class={firstChild.class}
    data={componentData}
    {id}
    bind:instance
    {keyMap}
    callbacks={{
      getOption,
      toggleFocus,
    }}
    onBlur={onInputBlur} 
    onFocus={onInputFocus}
    {onInit}
    onKeyUp={suggestionHandler}
    {size}
    bind:style={firstChild.style}
    type={TEXT_INPUT_TYPE_TEXT}
    isValidationPerformedWhileTyping={false}
    bind:value={valueHelper.display}
    {visibleWidth} />
  {#if isCurrentValueVisible
    && (valueHelper.inputFocused)}
    {@render renderCurrentValue(
      valueHelper.original ?? null,
      size,
      onMouseDown,
      onSuggestionClick,
      onSuggestionClick,
      isSuggestionListOnTop,
      valueStore,
    )}
  {/if}
  {#if isSuggestionListVisible
    && (valueHelper.inputFocused
      || isSuggestionListPinned)}
    <sveasuggestedvalues class:flip={isSuggestionListOnTop}
      class={suggestedValuesProps.class}
      role="list"
      style={suggestedValuesProps.style} >
      {#each suggestions.list as suggestion, index}
        {@render renderSuggestion(
          suggestion,
          index === suggestions.selected,
          onMouseDown,
          onSuggestionClick,
          onSuggestionClick,
          valueStore,
        )}
      {/each}
      {#if isSuggestionListPinnable}
        <Button class="pinSuggestions" leftIcon={pinIcon} onClick={pinSuggestions} {onMouseDown} {size}/>
      {/if}
    </sveasuggestedvalues>
  {/if}
</sveadropdowncontainer>