<script lang="ts">
  import {
    allowedListValidator,
    createFieldValidator,
    i18n,
    requiredValidator,
  } from '@sveadmin/common'

  import {
    DISPLAY_MODE_COMBO,
  } from '$lib/types.js'

  import {
    createOptionStore,
    focusNext,
    shake,
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
    areErrorsVisible = false,
    areHelpersFlipped = false,
    areHelpersVisible = true,
    class: classList = '',
    clearValueOnInit = false,
    displayMode = DISPLAY_MODE_COMBO,
    getValidationData = () => {return {}},
    id = 'switch-' + Math.random().toString(36).substring(2, 6),
    isEmptyAllowed = true,
    isNewValueAllowed = false,
    keyMap = {},
    onChange,
    onError,
    onKeyup,
    suggestionsLength = 10,
    setFocus = false,
    style = '',
    validators = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value = $bindable(''),
    values = []
  } : DropdownSearchProps = $props()
  
  let instance: HTMLInputElement,
    suggestions: SuggestionStore = $state({
      list: [],
      selected: -1,
    }),
    valueHelper: ValueHelperStore = $state({
      current: value,
      inputFocused: false,
      inputHideTimeout: 0,
      display: '',
      original: value,
      value,
    }),
    textPadding = shake()

  values = (Array.isArray(values))
    ? createOptionStore(values)
    : values


  const getDisplayValue = prepareGetDisplayValue(displayMode, values)
  const generateSuggestions = prepareGenerateSuggestions(values, suggestionsLength, isEmptyAllowed)
  const validateValue = prepareValidateValue(validators, getValidationData, textPadding)
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

  const suggestionHandler = prepareSuggestionHandler(
    {
      generateSuggestions,
      keyMap: {
        ...defaultKeyMap,
        ...keyMap
      },
      onKeyup,
      suggestions,
      valueHelper
    }
  )
  const onSuggestionClick = prepareSuggestionOnClick(valueHelper, setValue, () => focusNext(instance))
  const onInputBlur = preparepInputOnBlur(setValue, valueHelper)
  const focus = prepareFocus(clearValueOnInit, generateSuggestions, valueHelper, suggestions)
  const init = prepareInit(setFocus, focus, valueHelper, getDisplayValue)

  i18n.addMultipleLocales(translations)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator(values.options))
  }

  if (!isEmptyAllowed) {
    validators.prependValidator(requiredValidator())
  }

  $effect(() => {
    if (areErrorsVisible) console.log(JSON.stringify(validators))
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
</script>

<sveadropdowncontainer class={classList} {style}>
  <input
    type="text"
    class="dropdown-search"
    class:error={areErrorsVisible && !validators.result.valid}
    {id}
    value={(valueHelper.inputFocused) ? valueHelper.current : valueHelper.display}
    style="margin-left:
    {$textPadding}rem;"
    use:init
    onkeyup={suggestionHandler}
    onfocus={focus}
    onblur={onInputBlur} 
    bind:this={instance} />
  {#if areHelpersVisible && valueHelper.inputFocused}
    {#if valueHelper.original}
      <sveacurrentvalue
        class:flip={areHelpersFlipped}
        data-id="{valueHelper.original}"
        onclick={onSuggestionClick}
        onkeyup={onSuggestionClick}
        role="listbox"
        tabindex=0
      >
        {getDisplayValue(valueHelper.original)}
      </sveacurrentvalue>
    {:else}
      <sveacurrentvalue
        class:flip={areHelpersFlipped}
        data-id="{valueHelper.original}"
        onclick={onSuggestionClick}
        onkeyup={onSuggestionClick}
        role="button"
        tabindex=0
      >
        {i18n.t('DropdownEmptyValue')}
      </sveacurrentvalue>
    {/if}
    <sveasuggestedvalues class:flip={areHelpersFlipped} role="list">
    {#each suggestions.list as suggestion, index}
      {#if suggestion}
        <sveasuggestedvalue
          aria-selected={index === suggestions.selected}
          class:selected={index === suggestions.selected}
          data-id="{suggestion}"
          onclick={onSuggestionClick}
          onkeyup={suggestionHandler}
          role="option"
          tabindex="0"
        >{getDisplayValue(suggestion)}</sveasuggestedvalue>
      {:else}
        <sveasuggestedvalue
          aria-selected={index === suggestions.selected}
          class:selected={index === suggestions.selected}
          data-id="{suggestion}"
          onclick={onSuggestionClick}
          onkeyup={suggestionHandler}
          role="option"
          tabindex=0
        >Clear value</sveasuggestedvalue>
      {/if}
    {:else}
      No match...
    {/each}
    </sveasuggestedvalues>
  {:else}
    {#if areErrorsVisible && !validators.result.valid}
      {validators.result.message}
    {/if}
  {/if}
</sveadropdowncontainer>