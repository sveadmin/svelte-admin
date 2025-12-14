<script lang="ts">
  import {
    tick,
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
    KEY_ALLOWED_KEYS,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import type {
    KeyMap,
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

  let {
    autoCompleteOnSingleSuggestion = false,
    childrenConfig = $bindable({}),
    childrenClass = $bindable([]),
    childrenStyle = $bindable([]),
    class: classList = $bindable([]),
    clearValueOnInit = $bindable(false),
    getDisplayValue = getDisplayValueDefault,
    id = $bindable('dropdown-search-' + Math.random().toString(36).substring(2, 6)),
    instance = $bindable(),
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

  const Component = inputComponent //This is needed so Svelte can render it as a tag
  const childrenPropertyOverwrite = {
    class: childrenClass,
    style: childrenStyle,
  }
  const firstChild : TextInputProps = childParser(childrenConfig, 0, childrenPropertyOverwrite)
  const valueStore = (Array.isArray(values))
    ? createOptionStore(values, undefined, getDisplayValue)
    : values

  const generateSuggestions = prepareGenerateSuggestions(valueStore, suggestionsLength, isEmptyAllowed)
  const validateValue = prepareValidateValue(validators, validationData)

  let classes = $derived(normalizeArray(classList, ' ')),
    isSuggestionListPinned = $state(false),
    styles = $derived(normalizeArray(style, ';')),
    suggestions: SuggestionStore = $state({
      list: [],
      selected: -1,
    }),
    valueHelper: ValueHelperStore = createValueHelperStore(value)
    // valueHelper: ValueHelperStore = $state({
    //   current: value,
    //   inputFocused: false,
    //   display: '',
    //   original: value,
    //   suggestionSelectionInProgress: false,
    //   value,
    // })

  let pinIcon = $derived((isSuggestionListPinned) ? 'pin-slash' : 'pin'),
    realSuggestions = $derived(suggestions.list.filter(v => v !== null))

  const setValue = prepareSetValue({
    onChange: onChangeReceived,
    options: valueStore,
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
  const onInit = prepareInit(valueHelper, valueStore)
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
      valueHelper.display = valueStore.getDisplayValue(valueHelper.value)
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
        valueHelper.option = valueStore.getOption(value)
    }
  })

  $effect(() => {
    if ((Array.isArray(values))) {
      valueStore.options = values
    }
  })
  
  $inspect(value, valueHelper)
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
    data={{value}}
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
      valueHelper.original ?? null,
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
    <sveasuggestedvalues class:flip={isSuggestionListOnTop} role="list">
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