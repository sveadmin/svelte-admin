<script lang="ts">
  import {
    allowedListValidator,
    createFieldValidator,
    i18n,
    requiredValidator,
    status,
  } from '@sveadmin/common'

  import type {
    IsValid,
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
  } from './types.js'

  import {
    // prepareGenerateLookTable,
    // prepareGenerateSuggestions,
    prepareGetDisplayValue,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  import './dropdown-search.css'

  let {
    areHelpersVisible = true,
    classList = '',
    clearValueOnInit = false,
    displayMode = DISPLAY_MODE_COMBO,
    flipHelpers = false,
    focused = false,
    getValidationData = () => {return {}},
    isEmptyAllowed = true,
    isNewValueAllowed = false,
    onChange,
    onError,
    onKeyUp,
    suggestionsLength = 10,
    setFocus = false,
    style = '',
    validators = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value = $bindable(''),
    values = []
  } : DropdownSearchProps = $props()
  
  let clearedValue: string | number = null,
    originalValue: string | number,
    displayValue: string | null = $state(''),
    instance: HTMLInputElement,
    lookupTable: {[key: string]: string} = {},
    selectedSuggestion: number = -1,
    suggestions: string[] = [],
    textPadding = shake()

  values = (Array.isArray(values))
    ? createOptionStore(values)
    : values

  const { result, validate } = validators
  const getDisplayValue = prepareGetDisplayValue(displayMode, values)

  i18n.addMultipleLocales(translations)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator(values.options))
  }

  if (!isEmptyAllowed) {
    validators.prependValidator(requiredValidator())
  }

  $effect(() => {
    if (!result.valid
      && typeof onError === 'function'
    ) {
      onError(new Error(
        result.message,
        {
          cause: {
            code: result.error,
            value,
          }
        }
      ))
    }
  })

  const changeValue = (newValue: string) => {
    if (suggestions[selectedSuggestion]) {
        newValue = suggestions[selectedSuggestion]
    }
    if (isEmptyAllowed
          && suggestions[selectedSuggestion] === null) {
      newValue = null
    }

    if (originalValue !== newValue
        || value !== newValue //This can happen when typing in to narrow results
        || clearValueOnInit) {
      const validationResult = validate({
        data: getValidationData(),
        value: newValue
      })
      if (!result.valid) {
        status.add({message: result.message ?? '', type: 'error'});
        textPadding.shake()
        return false;
      }
      value = newValue
      clearedValue = null
      displayValue = getDisplayValue(value)
    }
    areHelpersVisible = false
    if (typeof onChange === 'function') {
      onChange(value)
    }
    return true

  }

  const inputKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    value = target.value
  }

  const inputKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    value = target.value
    const key = event.key
    if (key === 'Enter') {
      if (changeValue(value || null)) {
        focusNext(instance)
      }
    }
    if (key === 'Escape') {
      value = originalValue
      target.blur()
      if (areHelpersVisible) {
        areHelpersVisible = false
        event.stopPropagation()
        return;
      }
    }
    if (key === 'ArrowUp') {
      selectedSuggestion -= 1;
      if (selectedSuggestion < 0) {
        selectedSuggestion = suggestions.length - 1
      }
      return;
    }
    if (key === 'ArrowDown') {
      selectedSuggestion += 1;
      if (selectedSuggestion >= suggestions.length) {
        selectedSuggestion = 0
      }
      return;
    }
    areHelpersVisible = true;
    selectedSuggestion = -1;
    // suggestions = generateSuggestions(value, lookupTable)
    if (typeof onKeyUp === 'function') {
      onKeyUp(event)
    }
  }

  const onSuggestionClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    const target = event.target as HTMLInputElement
    changeValue(target.dataset.id || null)
    focusNext(instance)
  }

  const focus = () => {
    focused = true
    areHelpersVisible = true
    originalValue = value
    if (clearValueOnInit) {
      clearedValue = value
      value = null
    }
  }

  const blur = () => {
    if (clearValueOnInit) {
      focused = false
      return
    }
    validate({value})
    if (!result.valid) {
      status.add({message: result.message, type: 'error'});
      textPadding.shake()
    }
    focused = false
  }

  const init = (el: HTMLElement) => {
    if (setFocus) {
      el.focus()
      focus()
    }
    displayValue = getDisplayValue(value)
  }

  // beforeUpdate(() => {
  //   displayValue = getDisplayValue(value)
  //   suggestions = generateSuggestions(value, lookupTable)
  // })

  // values.subscribe(currentValue => generateLookTable(currentValue, lookupTable))

  // onMount(() => {
  //   if (!value
  //     && typeof getValue === 'function') {
  //     value = getValue()
  //   }
  // })
  originalValue = value
</script>

<sveadropdowncontainer class={classList} {style}>
  <input
    type="text"
    class="dropdownSearch"
    value={(focused) ? value : displayValue}
    style="padding-left:
    {$textPadding}rem;"
    use:init
    onkeydown={inputKeyDown}
    onkeyup={inputKeyUp}
    onfocus={focus}
    onblur={blur} 
    bind:this={instance} />
  {#if areHelpersVisible}
    {#if originalValue}
      <sveacurrentvalue
        data-id="{originalValue}"
        onclick={onSuggestionClick}
        onkeyup={onSuggestionClick}
        class:flip={flipHelpers}
      >
        {getDisplayValue(originalValue)}
      </sveacurrentvalue>
    {:else}
      <sveacurrentvalue
        data-id="{originalValue}"
        onclick={onSuggestionClick}
        onkeyup={onSuggestionClick}
        class:flip={flipHelpers}
      >
        {i18n.t('DropdownEmptyValue')}
      </sveacurrentvalue>
    {/if}
    <sveasuggestedvalues class:flip={flipHelpers}>
    {#each suggestions as suggestion, index}
      {#if suggestion}
        <sveasuggestedvalue
          data-id="{suggestion}"
          onclick={onSuggestionClick}
          onkeyup={onSuggestionClick}
          class:selected={index === selectedSuggestion}
        >{getDisplayValue(suggestion)}</sveasuggestedvalue>
      {:else}
        <sveasuggestedvalue
          data-id="{suggestion}"
          onclick={onSuggestionClick}
          onkeyup={onSuggestionClick}
          class:selected={index === selectedSuggestion}
        >Clear value</sveasuggestedvalue>
      {/if}
    {:else}
      No match...
    {/each}
    </sveasuggestedvalues>
  {/if}
</sveadropdowncontainer>