<script module lang="ts">
  import {
    noop,
  } from '@sveadmin/common'

  import './country-dropdown.css'

  export {
    renderCurrentValueFlag
  }
</script>

{#snippet renderCurrentValueFlag(
  value: string | number | null,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  isSuggestionListOnTop = false,
)}
  <sveacurrentvalue
    data-id={value}
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="listbox"
    tabindex=0
  >
    {#if value}
      <sveacountryflag class="fi fi-{value?.toString().toLowerCase()}"></sveacountryflag>
    {/if}
  </sveacurrentvalue>
{/snippet}
