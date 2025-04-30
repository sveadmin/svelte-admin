<script lang="ts">
  import {
    allowedListValidator,
    createFieldValidator,
    i18n,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    TextInput,
  } from '$lib/text-input/index.js'

  import {
    DISPLAY_MODE_COMBO,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import type {
    KeyMap,
  } from '$lib/types.js'

  import {
    createOptionStore,
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
    preparepInputOnBlur,
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

  import './dropdown-search.css'

  let {
    areHelpersFlipped = $bindable(false),
    areHelpersVisible = $bindable(true),
    class: classList = $bindable([]),
    clearValueOnInit = $bindable(false),
    containerClass = $bindable([]),
    containerStyle = $bindable([]),
    displayMode = DISPLAY_MODE_COMBO,
    id,
    instance = $bindable(),
    isEmptyAllowed = $bindable(true),
    isNewValueAllowed = $bindable(false),
    keyMap: importedKeyMap = {},
    onBlur,
    onChange,
    onError,
    onKeyup,
    suggestionsLength = $bindable(10),
    style = $bindable([]),
    validators = createFieldValidator([]), //To be able to read the errros supply an empty validator
    validationData,
    value = $bindable(''),
    values = $bindable([]),
    ...passthrough
  } : DropdownSearchProps = $props()
  
  let containerClasses = $derived(normalizeArray(containerClass, ' ')),
    containerStyles = $derived(normalizeArray(containerStyle, ';')),
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

  const keyMap: KeyMap = {
    ...defaultKeyMap,
    ...importedKeyMap
  }

  const suggestionHandler = prepareSuggestionHandler(
    {
      generateSuggestions,
      keyMap,
      onKeyup,
      suggestions,
      valueHelper
    }
  )
  const onSuggestionClick = prepareSuggestionOnClick(valueHelper, setValue, () => focusNext(instance))
  const onInputBlur = preparepInputOnBlur(setValue, valueHelper)
  const onFocus = prepareFocus(clearValueOnInit, generateSuggestions, valueHelper, suggestions)
  const onInit = prepareInit(valueHelper, getDisplayValue)

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

 {#snippet currentValueTemplate(currentValue: string | null)}
  <sveacurrentvalue
    class:flip={areHelpersFlipped}
    data-id="{valueHelper.original}"
    onmousedown={() => valueHelper.suggestionSelectionInProgress = true}
    onmouseup={onSuggestionClick}
    onkeyup={onSuggestionClick}
    role="listbox"
    tabindex=0
  >{currentValue}</sveacurrentvalue>
{/snippet}

{#snippet suggestionTemplate(suggestion: string | number | null | null, index: number)}
  <sveasuggestedvalue
    aria-selected={index === suggestions.selected}
    class:selected={index === suggestions.selected}
    data-id="{suggestion}"
    onmousedown={() => valueHelper.suggestionSelectionInProgress = true}
    onmouseup={onSuggestionClick}
    onkeyup={suggestionHandler}
    role="option"
    tabindex=0
  >{(suggestion) ? getDisplayValue(suggestion): i18n.t('DropdownClearValue')} ... {suggestion}</sveasuggestedvalue>
{/snippet}

<sveadropdowncontainer class={containerClasses.join(' ')} style={containerStyles.join(';')}>
  <TextInput
    {...passthrough}
    bind:class={classList}
    {id}
    {keyMap}
    onBlur={onInputBlur} 
    {onFocus}
    {onInit}
    onKeyup={suggestionHandler}
    bind:instance={instance}
    bind:style={style}
    type={TEXT_INPUT_TYPE_TEXT}
    {validators}
    validateWhileTyping={false}
    value={(valueHelper.inputFocused) ? valueHelper.current : valueHelper.display}
    />
  {#if areHelpersVisible && valueHelper.inputFocused}
    {#if valueHelper.original}
      {@render currentValueTemplate(getDisplayValue(valueHelper.original))}
    {:else}
      {@render currentValueTemplate(i18n.t('DropdownEmptyValue'))}
    {/if}
    <sveasuggestedvalues class:flip={areHelpersFlipped} role="list">
    {#each suggestions.list as suggestion, index}
      {@render suggestionTemplate(suggestion, index)}
    {/each}
    </sveasuggestedvalues>
  {/if}
</sveadropdowncontainer>