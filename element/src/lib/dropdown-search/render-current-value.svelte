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
    renderCurrentValueDefault
  }
</script>

{#snippet renderCurrentValueDefault(
  value: string | number | null,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  isSuggestionListOnTop = false,
  options?: OptionStore
)}
  <sveacurrentvalue
    class:flip={isSuggestionListOnTop}
    data-id="{value}"
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="listbox"
    tabindex=0
  >
    {#if value}
      {options?.getDisplayValue(value)}
    {:else}
      {i18n.t('DropdownEmptyValue')}
    {/if}
  </sveacurrentvalue>
{/snippet}