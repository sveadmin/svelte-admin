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
    OptionStore,
  } from '$lib/types.js'

  import {
    Button,
  } from '$lib/button/index.js'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  export {
    renderCurrentValueDefault
  }

  const copyAction = (value: string | string[] | number | null | undefined) => {
    if (!value) {
      return false
    }
    if (Array.isArray(value)) {
      navigator.clipboard.writeText(value.join(''))
      return true
    }
    navigator.clipboard.writeText(value.toString())
    return true
  }

</script>

{#snippet renderCurrentValueDefault(
  key: string | null,
  size: AllowedSize = SIZE_MEDIUM,
  onMouseDown: (event: Event) => void = noop,
  onMouseUp: (event: Event) => void = noop,
  onKeyUp: (event: Event) => void = noop,
  isSuggestionListOnTop = false,
  options?: OptionStore
)}
  {@const displayValue = options?.getDisplayValue(key)}
  <sveacurrentvalue
    class:flip={isSuggestionListOnTop}
    data-id="{key}"
    onmousedown={onMouseDown}
    onmouseup={onMouseUp}
    onkeyup={onKeyUp}
    role="listbox"
    tabindex=0
  >
    {#if key}
      {displayValue}
      <Button childrenConfig={{
          icon: {
            visibleHeight: "1em",
            visibleWidth: "1em",
          }
        }}
        data={{id: key}}
        leftIcon="copy"
        onMouseDown={(event: MouseEvent) => {
          if (event.button !== 0) {
            return true
          }
          return copyAction(displayValue)
        }}
        {size} />
    {:else}
      {i18n.t('DropdownEmptyValue')}
    {/if}
  </sveacurrentvalue>
{/snippet}