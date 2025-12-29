<script module lang="ts">
  import {
    i18n,
    noop,
  } from '@sveadmin/common'

  import type {
    OptionStore,
  } from '$lib/types.js'

  import * as translations from './translation/index.js'
  i18n.addMultipleLocales(translations)
  
  export {
    renderSuggestionDefault
  }
</script>

{#snippet renderSuggestionDefault(
  suggestion: string | null,
  isSelected: boolean,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  options?: OptionStore,
)}
  <sveasuggestedvalue
    aria-selected={isSelected}
    class:selected={isSelected}
    data-id={suggestion}
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="option"
    tabindex=0
  >{(suggestion) ? options?.getDisplayValue(suggestion): i18n.t('DropdownClearValue')}</sveasuggestedvalue>
{/snippet}
