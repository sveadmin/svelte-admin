<script lang="ts">
  import {
    tick,
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
    DISPLAY_MODE_COMBO,
    KEY_ALLOWED_KEYS,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import type {
    KeyMap,
    ValueHelperStore,
  } from '$lib/types.js'

  import {
    createOptionStore,
    childParser,
    focusNext,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    DropdownSearchProps,
    SuggestionStore,
  } from './types.js'

  import {
    prepareFocus,
    prepareInputOnBlur,
    prepareInit,
    prepareSetValue,
    prepareValidateValue,
    prepareSuggestionHandler,
    prepareSuggestionOnArrowDown,
    prepareSuggestionOnArrowUp,
    prepareSuggestionOnClick,
    prepareSuggestionOnEnter,
    prepareSuggestionOnEscape,
  } from './action/index.js'

  import {
    prepareGenerateSuggestions,
    prepareGetDisplayValue,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  import {
    renderCurrentValueDefault,
  } from './render-current-value-default.svelte'

  import {
    renderSuggestionLabelOnly,
  } from './render-suggestion-label-only.svelte'

  import './dropdown-search.css'

  let {
    autoCompleteOnSingleSuggestion = false,
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    clearValueOnInit = $bindable(false),
    displayMode = DISPLAY_MODE_COMBO,
    getDisplayValue,
    id = $bindable('dropdown-search-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable(),
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
    renderSuggestion = renderSuggestionLabelOnly,
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

  const childrenPropertyOverwrite = {
    class: childrenClass,
    style: childrenStyle,
  }
  const firstChild : TextInputProps = childParser(childrenConfig, 0, childrenPropertyOverwrite)
  const valueStore = (Array.isArray(values))
    ? createOptionStore(values)
    : values
  
  if (!getDisplayValue) {
    getDisplayValue = prepareGetDisplayValue(displayMode, valueStore)
  }

  const generateSuggestions = prepareGenerateSuggestions(valueStore, suggestionsLength, isEmptyAllowed)
  const validateValue = prepareValidateValue(validators, validationData)

  let classes = $derived(normalizeArray(classList, ' ')),
    isSuggestionListPinned = $state(false),
    styles = $derived(normalizeArray(style, ';')),
    suggestions: SuggestionStore = $state({
      list: [],
      selected: -1,
    }),
    valueHelper: ValueHelperStore = $state({
      current: value,
      inputFocused: false,
      display: '',
      original: value,
      suggestionSelectionInProgress: false,
      value,
    })

  let pinIcon = $derived((isSuggestionListPinned) ? 'pin-slash' : 'pin'),
    realSuggestions = $derived(suggestions.list.filter(v => v !== null))

  const setValue = prepareSetValue({
    getDisplayValue,
    onChange: onChangeReceived,
    validateValue,
    valueHelper,
  })

  const defaultKeyMap = {
    'Enter': prepareSuggestionOnEnter(setValue, suggestions, valueHelper, () => focusNext(instance)),
    'Escape': prepareSuggestionOnEscape(setValue, valueHelper),
    'ArrowUp': prepareSuggestionOnArrowUp(suggestions),
    'ArrowDown': prepareSuggestionOnArrowDown(suggestions),
  }

  if (autoCompleteOnSingleSuggestion) {
    const onAllowedKeysReceived = keyMapReceived[KEY_ALLOWED_KEYS]
    keyMapReceived[KEY_ALLOWED_KEYS] = (event: KeyboardEvent) : boolean | Promise<boolean> => {
      let result: boolean | Promise<boolean> = true
      if (onAllowedKeysReceived) {
        result = onAllowedKeysReceived(event)
      }

      tick().then(() => {
          if (realSuggestions.length === 1) {
            valueHelper.current = valueHelper.display
            setValue(realSuggestions[0])
            focusNext(instance)
          }
      })

      return result
    }
  }

  const keyMap: KeyMap = {
    ...defaultKeyMap,
    ...keyMapReceived
  }

  const suggestionHandler = prepareSuggestionHandler(
    {
      generateSuggestions,
      keyMap,
      onKeyUp: onKeyUpReceived,
      suggestions,
      valueHelper
    }
  )
  const onSuggestionClick = prepareSuggestionOnClick(valueHelper, setValue, () => focusNext(instance))
  const onInputBlur = prepareInputOnBlur(setValue, valueHelper, valueStore, onBlurReceived)
  const onInputFocus = (onFocusReceived)
    ? wrapOnFocus(onFocusReceived, prepareFocus(clearValueOnInit, generateSuggestions, valueHelper, suggestions))
    : prepareFocus(clearValueOnInit, generateSuggestions, valueHelper, suggestions)
  const onInit = prepareInit(valueHelper, getDisplayValue)
  const onMouseDown = () => valueHelper.suggestionSelectionInProgress = true

  const pinSuggestions = () => {
    isSuggestionListPinned = !isSuggestionListPinned
    valueHelper.suggestionSelectionInProgress = false
  }

  let displayGuard: string | number | null = null,
    valueGuard: string | number | null = null

  i18n.addMultipleLocales(translations)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator({lookupTable: () => valueStore.optionsByValue}))
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
    // This is needed as the Proxy value gets "cached" before tick, and can revert the value back to the original
    if (displayGuard !== valueHelper.value) {
      valueHelper.display = getDisplayValue(valueHelper.value)
      displayGuard = valueHelper.value
    }
  })

  $effect(() => {
    // This is needed as the Proxy value gets "cached" before tick, and can revert the value back to the original
    if (valueGuard !== valueHelper.value) {
      value = valueHelper.value
      valueGuard = valueHelper.value
    }
  })

  $effect(() => {
    if (value !== valueHelper.value) {
        valueHelper.value = value
        valueHelper.original = value
        valueHelper.current = value
    }
  })

  $effect(() => {
    if ((Array.isArray(values))) {
      valueStore.options = values
    }
  })
  
  // $inspect(value, valueHelper)
</script>
<sveadropdowncontainer class={classes.join(' ')} style={styles.join(';')} data-size={size}>
  <TextInput
    {...passthrough}
    {...firstChild}
    bind:class={firstChild.class}
    {id}
    {keyMap}
    onBlur={onInputBlur} 
    onFocus={onInputFocus}
    {onInit}
    onKeyUp={suggestionHandler}
    bind:instance={instance}
    {size}
    bind:style={firstChild.style}
    type={TEXT_INPUT_TYPE_TEXT}
    validateWhileTyping={false}
    bind:value={valueHelper.display}
    {visibleWidth} />
  {#if isCurrentValueVisible
    && (valueHelper.inputFocused)}
    {@render renderCurrentValue(
      valueHelper,
      getDisplayValue,
      onMouseDown,
      onSuggestionClick,
      onSuggestionClick,
      isSuggestionListOnTop
    )}
  {/if}
  {#if isSuggestionListVisible
    && (valueHelper.inputFocused
      || isSuggestionListPinned)}
    <sveasuggestedvalues class:flip={isSuggestionListOnTop} role="list">
      {#each suggestions.list as suggestion, index}
        {@render renderSuggestion(
          suggestion,
          index === suggestions.selected,
          getDisplayValue,
          onMouseDown,
          onSuggestionClick,
          onSuggestionClick,
        )}
      {/each}
    </sveasuggestedvalues>
    {#if isSuggestionListPinnable}
      <Button leftIcon={pinIcon} onClick={pinSuggestions} {onMouseDown} {size}/>
    {/if}
  {/if}
</sveadropdowncontainer>