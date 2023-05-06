<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import {
    allowedListValidator,
    createFieldValidator,
    i18n,
    IsValid,
    requiredValidator,
    status,
    ValidatorStore,
  } from '@sveadmin/common'

  import type {
    AllowedDisplayMode,
    Option,
  } from './types.js'

  import {
    focusNext,
    shake,
  } from '../helper/index.js'

  import {
    generateLookTable,
    prepareGenerateSuggestions,
    prepareGetDisplayValue,
  } from './helper/index.js'

  import * as translations from './translation/index.js'

  export let canHideHelpers: boolean = false,
    clearedValue: string | number = null,
    clearValueOnInit: boolean = false,
    data: {} = {},
    displayMode: AllowedDisplayMode = 'combo',
    getValue: {() : string | number} = null,
    id: string = '',
    isEmptyAllowed: boolean = true,
    isNewValueAllowed: boolean = false,
    flipHelpers: boolean = false,
    focused: boolean = false,
    originalValue: string | number,
    maxSuggestions: number = 10,
    setFocus: boolean = false,
    showHelpers: boolean = true,
    validators: ValidatorStore = createFieldValidator([]), //To be able to read the errros supply an empty validator
    value: string | number = '',
    values: Array<Option> = []

  let displayValue: string = '',
    instance: HTMLInputElement,
    lookupTable: {[key: string]: string} = {},
    selectedSuggestion: number = -1,
    suggestions: Array<string> = [],
    textPadding = shake()

  const { validate } = validators
  const dispatch = createEventDispatcher()
  const generateSuggestions = prepareGenerateSuggestions(maxSuggestions, isEmptyAllowed)
  const getDisplayValue = prepareGetDisplayValue(displayMode, () => lookupTable)

  i18n.addMultipleLocales(translations)

  if (!isNewValueAllowed) {
    validators.prependValidator(allowedListValidator({}, () => generateLookTable(values, lookupTable)))
  }

  if (!isEmptyAllowed) {
    validators.prependValidator(requiredValidator())
  }

  validators.subscribe((isValid: IsValid) => {
    if (!isValid.valid) {
      dispatch('error', {
        id,
        isValid
      })
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
      validate({
        value: newValue
      })
      if (!$validators.valid) {
        status.add({message: $validators.message, type: 'error'});
        textPadding.shake()
        return false;
      }
      value = newValue
      clearedValue = null
      displayValue = getDisplayValue(value)
    }
    showHelpers = false
    dispatch('valueChanged', value)
    return true

  }

  const inputKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    value = target.value
  }

  const inputKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    value = target.value
    const keyCode = event.code
    if (keyCode === 'Enter') {
      if (changeValue(value || null)) {
        focusNext(instance)
      }
    }
    if (keyCode === 'Escape') {
      value = originalValue
      target.blur()
      if (canHideHelpers
        && showHelpers) {
        showHelpers = false
        event.stopPropagation()
        return;
      }
    }
    if (keyCode === 'ArrowUp') {
      selectedSuggestion -= 1;
      if (selectedSuggestion < 0) {
        selectedSuggestion = suggestions.length - 1
      }
      return;
    }
    if (keyCode === 'ArrowDown') {
      selectedSuggestion += 1;
      if (selectedSuggestion >= suggestions.length) {
        selectedSuggestion = 0
      }
      return;
    }
    showHelpers = true;
    selectedSuggestion = -1;
    suggestions = generateSuggestions(value, lookupTable)
    dispatch('keyup', event)
  }

  const onSuggestionClick = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLInputElement
    changeValue(target.dataset.id || null)
    focusNext(instance)
  }

  const focus = () => {
    focused = true
    showHelpers = true
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
    if (!$validators.valid) {
      status.add({message: $validators.message, type: 'error'});
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

  beforeUpdate(() => {
    lookupTable = generateLookTable(values, lookupTable)
    displayValue = getDisplayValue(value)
    suggestions = generateSuggestions(value, lookupTable)
  })

  onMount(() => {
    if (typeof getValue === 'function') {
      value = getValue()
    }
    originalValue = value
  })
</script>

<dropdowncontainer>
  <input
    type="text"
    class="dropdownSearch"
    value={(focused) ? value : displayValue}
    style="padding-left:
    {$textPadding}rem;"
    use:init
    on:keydown={inputKeyDown}
    on:keyup={inputKeyUp}
    on:focus={focus}
    on:blur={blur} 
    bind:this={instance} />
  {#if showHelpers}
    {#if originalValue}
      <currentvalue
        data-id="{originalValue}"
        on:click={onSuggestionClick}
        on:keyup={onSuggestionClick}
        class:flip={flipHelpers}
      >
        {getDisplayValue(originalValue)}
      </currentvalue>
    {:else}
      <currentvalue
        data-id="{originalValue}"
        on:click={onSuggestionClick}
        on:keyup={onSuggestionClick}
        class:flip={flipHelpers}
      >
        {i18n.t('DropdownEmptyValue')}
      </currentvalue>
    {/if}
    <suggestedvalues class:flip={flipHelpers}>
    {#each suggestions as suggestion, index}
      {#if suggestion}
        <suggestedvalue
          data-id="{suggestion}"
          on:click={onSuggestionClick}
          on:keyup={onSuggestionClick}
          class:selected={index === selectedSuggestion}
        >{getDisplayValue(suggestion)}</suggestedvalue>
      {:else}
        <suggestedvalue
          data-id="{suggestion}"
          on:click={onSuggestionClick}
          on:keyup={onSuggestionClick}
          class:selected={index === selectedSuggestion}
        >Clear value</suggestedvalue>
      {/if}
    {:else}
      No match...
    {/each}
    </suggestedvalues>
  {/if}
</dropdowncontainer>

<style global src="./dropdown-search.css"></style>