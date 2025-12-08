<script module lang="ts">
  import {
    i18n,
    noop,
  } from '@sveadmin/common'

  import * as translations from './translation/index.js'

  import './country-dropdown.css'

  i18n.addMultipleLocales(translations)

  export {
    renderSuggestionCountry
  }
</script>

{#snippet renderSuggestionCountry(
  suggestion: string | number | null | null,
  isSelected: boolean,
  getDisplayValue = (value: any) => value,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
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
  >
    {#if suggestion}
      <sveacountryflag class="fi fi-{suggestion?.toString().toLowerCase()}"></sveacountryflag>
    {/if}
    {(suggestion) ? getDisplayValue(suggestion): i18n.t('DropdownClearValue')}
  </sveasuggestedvalue>
{/snippet}
