<script module lang="ts">
  import {
    i18n,
    noop,
  } from '@sveadmin/common'

  import type {
    OptionStore,
  } from '$lib/types.js'

  import {
    ImageWrapped,
  } from '$lib/image/index.js'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  export {
    renderSuggestionCountry
  }
</script>

{#snippet renderSuggestionCountry(
  suggestion: string | null | null,
  isSelected: boolean,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  options?: OptionStore
)}
  <sveasuggestedvalue
    aria-selected={isSelected}
    class:selected={isSelected}
    data-id={suggestion}
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="option"
    style="padding-left: 3em"
    tabindex=0
  >
    {#if suggestion}
      <ImageWrapped class="fi flagSuggestion"
        data={{id: suggestion?.toString()}}
        icon="{suggestion?.toString().toLowerCase()}"
        iconPrefix="fi-"
        visibleHeight="auto"
        visibleWidth="2.5em" />
        {options?.getDisplayValue(suggestion)}
    {:else}
      {i18n.t('DropdownClearValue')}
    {/if}
  </sveasuggestedvalue>
{/snippet}
