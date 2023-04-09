<script lang="ts">
  import { beforeUpdate, createEventDispatcher, onMount } from 'svelte';
  import { readable } from 'svelte/store';

  import {
    focusNext,
    shake,
  } from '../helper/'

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
    validators: {validity: any, validate: () => ({valid: boolean})} = {validity: readable({valid: true}), validate: () => {return {valid: true}}},
    value: string = '',
    values: Array<string> = []

  let displayValue: string = '',
    instance: HTMLElement,
    lookupTable: {[key: string]: string} = {},
    selectedSuggestion: number = -1,
    suggestions: Array<string> = []

  const { validity, validate } = validators
  const dispatch = createEventDispatcher()

  validity.subscribe((validity) => {
    dispatch('errorMessage', {
      id,
      validity
    })
  })

  const setLookTable = () => {
    lookupTable = values.reduce(
      (aggregator, row) => {
        if (!lookupTable[row.id]) {
          lookupTable[row.id] = row.value
        }
        return aggregator
      },
      lookupTable
    )
    displayValue = getDisplayValue(value)
  }

  let textPadding = shake(
    .4,
    0,
    {
      stiffness: 0.25,
      damping: 0.11,
      delay: 20
    }
  );

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

  const generateLookupValues = () => {
    const valueString = (value) ? value.toString() : null
    suggestions = lookupTable[valueString] ? [valueString] : []
    for (const id in lookupTable) {
      if ((!valueString
            || (lookupTable[id]
              && lookupTable[id].toLowerCase().indexOf(valueString.toLowerCase()) !== -1))
          && suggestions.indexOf(id) === -1
          && suggestions.length < maxSuggestions) {
        suggestions.push(id.toString());
      }
    }
    if (suggestions.length < maxSuggestions) {
      for (const id in lookupTable) {
        if (valueString
            && id.toLowerCase().substring(0, valueString.length) === valueString.toLowerCase()
            && suggestions.indexOf(id) === -1
            && suggestions.length < maxSuggestions) {
          suggestions.push(id.toString());
        }
      }
    }
    if (isEmptyAllowed) {
      suggestions.push(null)
    }
  }

  const inputKeyDown = event => {
    value = event.target.value
  }

  const inputKeyUp = event => {
    value = event.target.value
    const keyCode = event.keyCode ?? event.detail.keyCode
    if (keyCode === 13) {
      if (changeValue(value || null)) {
        focusNext(instance)
      }
    }
    if (keyCode === 27) {
      value = originalValue
      event.target.blur()
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
    generateLookupValues()
    dispatch('keyup', event)
  }

  const onSuggestionClick = (event) => {
    changeValue(event.target.dataset.id || null)
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
    setLookTable()
    generateLookupValues()
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
        class:flip={flipHelpers}
      >
        {getDisplayValue(originalValue)}
      </currentvalue>
    {:else}
      <currentvalue
        data-id="{originalValue}"
        on:click={onSuggestionClick}
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
          class:selected={index === selectedSuggestion}
        >{getDisplayValue(suggestion)}</suggestedvalue>
      {:else}
        <suggestedvalue
          data-id="{suggestion}"
          on:click={onSuggestionClick}
          class:selected={index === selectedSuggestion}
        >Clear value</suggestedvalue>
      {/if}
    {:else}
      No match...
    {/each}
    </suggestedvalues>
  {/if}
</dropdowncontainer>