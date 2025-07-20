<script module lang="ts">
  import {
    i18n,
    noop,
  } from '@sveadmin/common'

  import * as translations from './translation/index.js'

  import type {
    ValueHelperStore
  } from './types.js'

  i18n.addMultipleLocales(translations)

  export {
    defaultRenderCurrentValue
  }
</script>

{#snippet defaultRenderCurrentValue(
  valueHelper: ValueHelperStore,
  getDisplayValue = (value: any) => value,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  areHelpersFlipped = false
)}
  <sveacurrentvalue
    class:flip={areHelpersFlipped}
    data-id="{valueHelper.original}"
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="listbox"
    tabindex=0
  >
  {#if valueHelper.original}
    {getDisplayValue(valueHelper.original)}
  {:else}
    {i18n.t('DropdownEmptyValue')}
  {/if}
  </sveacurrentvalue>
{/snippet}