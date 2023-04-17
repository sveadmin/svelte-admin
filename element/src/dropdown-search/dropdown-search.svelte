<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import { readable, Readable } from 'svelte/store';
  import type {
    Option,
    Validity,
  } from './dropdown-search.svelte'

  import {
    focusNext,
    shake,
  } from '../helper/'

  import {
    generateLookTable,
    prepareGenerateSuggestions,
  } from './helper'

  export let canHideHelpers: boolean = false,
    clearedValue: string = null,
    clearValueOnInit: boolean = false,
    data: {} = {},
    displayMode: string = 'combo',
    id: string = '',
    isEmptyAllowed: boolean = true,
    isNewValueAllowed: boolean = false,
    flipHelpers: boolean = false,
    focused: boolean = false,
    originalValue: string,
    maxSuggestions: number = 10,
    setFocus: boolean = false,
    showHelpers: boolean = true,
    validators: {validity: Readable<Validity>, validate: () => ({valid: boolean})} = {validity: readable({valid: true}), validate: () => {return {valid: true}}},
    value: string = '',
    values: Array<Option> = []

  let displayValue: string = '',
    instance: HTMLInputElement,
    lookupTable: {[key: string]: string} = {},
    selectedSuggestion: number = -1,
    suggestions: Array<string> = []

  const { validity, validate } = validators
  const dispatch = createEventDispatcher()
  const generateSuggestions = prepareGenerateSuggestions(maxSuggestions, isEmptyAllowed)

  validity.subscribe((validity: Validity) => {
    dispatch('errorMessage', {
      id,
      validity
    })
  })

  let textPadding = shake();

  const checkValue = newValue => {
    if (!newValue) {
      newValue = value ?? ''
    }
    if ((isNewValueAllowed || Object.keys(lookupTable).indexOf(newValue.toString()) !== -1)
      || (!newValue && isEmptyAllowed)) {
      return true
    }
    status.add(
      {
        message: 'Invalid value.' + ((!isNewValueAllowed) ? ' No new values.' : '') + ((!isEmptyAllowed) ? ' No empty values.' : ''),
        type: 'error'
      })
    textPadding.shake()
    return false
  }

  const changeValue = newValue => {
    if (suggestions[selectedSuggestion]) {
        newValue = suggestions[selectedSuggestion]
    }
    if (isEmptyAllowed
          && suggestions[selectedSuggestion] === null) {
      newValue = null
    }

    if (originalValue !== newValue
        || clearValueOnInit) {
      if (!checkValue(newValue)) {
          return false
      }
      validate(newValue, false, data)
      if (!$validity.valid) {
        status.add({message: $validity.message, type: 'error'});
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
    const keyCode = event.code ?? event.detail.code
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
    if (keyCode === 38) {
      selectedSuggestion -= 1;
      if (selectedSuggestion < 0) {
        selectedSuggestion = suggestions.length - 1
      }
      return;
    }
    if (keyCode === 40) {
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

  const blur = (event) => {
    if (clearValueOnInit) {
      focused = false
      return
    }
    checkValue(value)
    validate(value, null, data)
    if (!$validity.valid) {
      status.add({message: $validity.message, type: 'error'});
      textPadding.shake()
    }
    focused = false
  }

  const init = (el) => {
    if (setFocus) {
      el.focus()
      focus()
    }
    displayValue = getDisplayValue(value)
  }

  const getDisplayValue = value => {
    switch (displayMode) {
      case 'value':
        return value
      case 'label':
        return lookupTable[value] || value
      case 'combo':
        if (value) {
          return value + ' - ' + lookupTable[value] || '[NEW]'
        } else {
          return null
        }
    }
    return value
  }

  beforeUpdate(() => {
    lookupTable = generateLookTable(values, lookupTable)
    displayValue = getDisplayValue(value)
    suggestions = generateSuggestions(value, lookupTable)
  })

  onMount(() => {
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
        [EMPTY]
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