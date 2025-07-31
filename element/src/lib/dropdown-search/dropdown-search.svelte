<script lang="ts">
  import {
    tick,
  } from 'svelte'

  import {
    rune,
  } from '@sveadmin/common'

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
  } from '$lib/types.js'

  import {
    createOptionStore,
    firstChildParser,
    focusNext,
    normalizeArray,
  } from '$lib/helper/index.js'

  import type {
    DropdownSearchProps,
    SuggestionStore,
    ValueHelperStore,
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
    renderCurrentValueDefault
  } from './render-current-value-default.svelte'

  import {
    renderSuggestionDefault
  } from './render-suggestion-default.svelte'

  import './dropdown-search.css'

  let {
    autoCompleteOnSingleSuggestion = false,
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    clearValueOnInit = $bindable(false),
    displayMode = DISPLAY_MODE_COMBO,
    id,
    instance = $bindable(),
    isCurrentValueVisible = $bindable(true),
    isEmptyAllowed = $bindable(true),
    isNewValueAllowed = $bindable(false),
    isSuggestionListOnTop = $bindable(false),
    isSuggestionListPinnable = $bindable(false),
    isSuggestionListVisible = $bindable(true),
    keyMap: keyMapReceived = {},
    onBlur,
    onChange,
    onError,
    onFocus,
    onKeyUp,
    renderCurrentValue = renderCurrentValueDefault,
    renderSuggestion = renderSuggestionDefault,
    suggestionsLength = $bindable(10),
    size,
    style = $bindable([]),
    validators = createFieldValidator([]), //To be able to read the errros supply an empty validator
    validationData,
    value = $bindable(''),
    values = $bindable([]),
    ...passthrough
  } : DropdownSearchProps = $props()

  const childrenPropertyMap = {
    class: childrenClass,
    style: childrenStyle,
  }

  const firstChild : TextInputProps = firstChildParser(childrenConfig, childrenPropertyMap)

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

  const valueStore = (Array.isArray(values))
    ? createOptionStore(values)
    : values

  const getDisplayValue = prepareGetDisplayValue(displayMode, valueStore)
  const generateSuggestions = prepareGenerateSuggestions(valueStore, suggestionsLength, isEmptyAllowed)
  const validateValue = prepareValidateValue(validators, validationData)
  const setValue = prepareSetValue({
    clearValueOnInit,
    getDisplayValue,
    onChange,
    validateValue,
    valueHelper,
  })

  const defaultKeyMap = {
    'Enter': prepareSuggestionOnEnter(setValue, suggestions, () => focusNext(instance)),
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
      onKeyUp,
      suggestions,
      valueHelper
    }
  )
  const onSuggestionClick = prepareSuggestionOnClick(valueHelper, setValue, () => focusNext(instance))
  const onInputBlur = prepareInputOnBlur(setValue, valueHelper, valueStore, onBlur)
  const onInputFocus = prepareFocus(clearValueOnInit, generateSuggestions, valueHelper, suggestions, onFocus)
  const onInit = prepareInit(valueHelper, getDisplayValue)
  const onMouseDown = () => valueHelper.suggestionSelectionInProgress = true

  const pinSuggestions = () => {
    isSuggestionListPinned = !isSuggestionListPinned
    valueHelper.suggestionSelectionInProgress = false
  }

  i18n.addMultipleLocales(translations)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator({lookupTable: () => valueStore.optionsById}))
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
    valueHelper.display = getDisplayValue(valueHelper.value)
  })

  $effect(() => {
    value = valueHelper.value
  })

  $effect(() => {
    if ((Array.isArray(values))) {
      valueStore.options = values
    }
  })

  $inspect(valueHelper)
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
    value={(valueHelper.inputFocused) ? valueHelper.current : valueHelper.display} />
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
          onSuggestionClick
        )}
      {/each}
    </sveasuggestedvalues>
    {#if isSuggestionListPinnable}
      <Button leftIcon={pinIcon} onClick={pinSuggestions} {onMouseDown} {size}/>
    {/if}
  {/if}
</sveadropdowncontainer>