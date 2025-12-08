<script module lang="ts">
  import {
    noop,
  } from '@sveadmin/common'

  import './country-dropdown.css'

  export {
    renderSuggestionFlag
  }
</script>

{#snippet renderSuggestionFlag(
  suggestion: string | number | null | null,
  isSelected: boolean,
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
    style="font-size:1.5em"
    tabindex=0
  >
    {#if suggestion}
      <sveacountryflag class="fi fi-{suggestion?.toString().toLowerCase()}"></sveacountryflag>
    {/if}
  </sveasuggestedvalue>
{/snippet}
