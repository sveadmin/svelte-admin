<script module lang="ts">
  import {
    noop,
  } from '@sveadmin/common'

  import {
    SIZE_MEDIUM,
  } from '$lib/types.js'

  import type {
    AllowedSize,
    OptionStore,
  } from '$lib/types.js'

  import './country-dropdown.css'

  export {
    renderCurrentValueFlag
  }
</script>

{#snippet renderCurrentValueFlag(
  key: string | null,
  size: AllowedSize = SIZE_MEDIUM,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  options?: OptionStore
)}
  {@const option = options?.getOption(key ?? undefined)}
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
        class="fi fi-{option?.properties?.flag}"
        data-id={key}
        onmousedown={onMouseDown}
        onmouseup={onMouseUp}
        onkeyup={onKeyUp}
        role="listbox"
        tabindex=0 >
      </sveacountryflag>
    {/if}
  </sveacurrentvalue>
{/snippet}
