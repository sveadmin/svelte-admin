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

  export {
    renderSuggestionPrefix
  }
</script>

{#snippet renderSuggestionPrefix(
  suggestion: string | number | null | null,
  isSelected: boolean,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  options?: OptionStore
)}
  {@const option = options?.getOption(suggestion?.toString())}
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
        icon="{option?.properties?.flag.toString()}"
        iconPrefix="fi-"
        visibleHeight="auto"
        visibleWidth="2.5em" />
    {/if}
    {(suggestion) ? options?.getDisplayValue(suggestion?.toString()): i18n.t('DropdownClearValue')}
  </sveasuggestedvalue>
{/snippet}
