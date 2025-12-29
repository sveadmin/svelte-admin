<script module lang="ts">
  import {
    i18n,
    noop,
  } from '@sveadmin/common'

  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import type {
    AllowedSize,
    OptionStore
  } from '$lib/types.js'

  import './country-dropdown.css'

  export {
    renderCurrentValuePrefix
  }
</script>

{#snippet renderCurrentValuePrefix(
  key: string | null,
  size: AllowedSize = SIZE_MEDIUM,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  isSuggestionListOnTop = false,
  options?: OptionStore
)}
  {@const option = options?.getOption(key || undefined)}
  <sveacurrentvalue
    data-id={key}
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="listbox"
    tabindex=0
  >
    {#if key}
      <sveacountryflag
        class="fi fi-{option?.properties?.flag.toString()}"
        data-id={key}
        onmousedown={onMouseDown}
        onmouseup={onMouseUp}
        onkeyup={onKeyUp}
        role="listbox"
        tabindex=0 >
      </sveacountryflag>
      {options?.getDisplayValue(key)}
    {:else}
      {i18n.t('DropdownClearValue')}
    {/if}
  </sveacurrentvalue>
{/snippet}
