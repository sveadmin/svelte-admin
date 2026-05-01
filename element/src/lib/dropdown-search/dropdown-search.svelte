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
    dataParser,
    focusNext,
    normalizeArray,
    propertyMerger,
    wrapOnFocus,
  } from '$lib/helper/index.js'

  import {
    createOptionStore,
  } from '$lib/option/index.js'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import {
    createValueHelperStore,
  } from '$lib/value-helper/index.js'

  import {
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import type {
    KeyMap,
    OptionIndexed,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
  } from '$lib/helper/index.js'

  import type {
    DropdownSearchInputProps,
    SuggestionStore,
  } from './types.js'

  import {
    prepareFocus,
    prepareInputOnBlur,
    prepareInit,
    prepareSetCaseCorrectValue,
    prepareSetKeyForEmptyDropdown,
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
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
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
    isValueClearedOnInit = $bindable(false),
    isValueSetAutomaticallyOnSingleSuggestion = false,
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
  } : DropdownSearchInputProps = $props()

  let Component = inputComponent //This is needed so Svelte can render it as a tag
  const valueStore = (Array.isArray(values))
    ? createOptionStore(
        values,
        suggestionsLength,
        isEmptyAllowed,
        getKey,
        getDisplayValue
      )
    : values

  const childrenPropertyOverwrite = {
    class: childrenClass,
    style: childrenStyle,
  }

  const inputConfig = propertyMerger(
    childrenConfig?.input,
    childrenConfig?.[0],
    childrenPropertyOverwrite,
    passthrough
  )

  const suggestedValuesConfig = propertyMerger(
    childrenConfig?.suggestedValues,
    childrenConfig?.[1],
    childrenPropertyOverwrite,
  )

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

  const setCaseCorrectValue = prepareSetCaseCorrectValue(valueStore, valueHelper),
    setKeyForEmptyDropdown = prepareSetKeyForEmptyDropdown(valueStore, valueHelper)

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
    ? wrapOnFocus(onFocusReceived, prepareFocus(isValueClearedOnInit, valueStore.generateSuggestions, valueHelper, suggestions))
    : prepareFocus(isValueClearedOnInit, valueStore.generateSuggestions, valueHelper, suggestions)
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
    instance?.ref?.focus()
    if (!isSuggestionListPinned) {
      valueHelper.suggestionSelectionInProgress = false
    }
  }

  export const getOption: () => OptionIndexed | undefined = () => valueStore.getOption(valueHelper.key)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator({lookupTable: () => valueStore.optionsMapped}))
  }

  if (!isEmptyAllowed) {
    validators.prependValidator(requiredValidator())
  }

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
    if (valueHelper.inputFocused) {
      return
    }
    if (valueHelper.display !== ''
      && valueStore.getDisplayValue(valueHelper.key) === valueHelper.display) {
      return
    }

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
        value = setCaseCorrectValue(isValid)
      })
      valueHelper.display = valueStore.getDisplayValue(valueHelper.key)
      return
    } else {
      //This part handles type in to an empty dropdown
      untrack(() => {
        value = setKeyForEmptyDropdown()
      })
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
    if (isValueSetAutomaticallyOnSingleSuggestion
      && realSuggestions.length === 1
      && valueHelper.key != realSuggestions[0]
      && valueHelper.inputFocused) {
      valueHelper.current = valueHelper.display
      valueHelper.key = realSuggestions[0]
      focusNext(instance?.ref as HTMLInputElement)
    }
  })

  $effect(() => {
    if (isSuggestionListPinned) {
      suggestions.selected = suggestions.list.indexOf(valueHelper.key ?? null)
    }
  })

  // $inspect('DDDDDDD', value, valueHelper)
  // $inspect('SUGG', suggestions, realSuggestions)
</script>
<sveadropdowncontainer
  class={classes.join(' ')}
  class:flip={isSuggestionListOnTop}
  data-size={size}
  style={styles.join(';')} >
  <Component
    {...inputConfig}
    data={componentData}
    {getOption},
    {id}
    bind:instance
    isValidationPerformedWhileTyping={false}
    {keyMap}
    onBlur={onInputBlur} 
    onFocus={onInputFocus}
    {onInit}
    onKeyUp={suggestionHandler}
    {size}
    {toggleFocus}
    type={TEXT_INPUT_TYPE_TEXT}
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
      {...dataParser(suggestedValuesConfig?.data)}
      class={suggestedValuesConfig.class}
      role="list"
      style={suggestedValuesConfig.style} >
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
        <Button class="pinSuggestions"
        leftIcon={pinIcon}
        onClick={pinSuggestions}
        {onMouseDown}
        {size} />
      {/if}
    </sveasuggestedvalues>
  {/if}
</sveadropdowncontainer>
