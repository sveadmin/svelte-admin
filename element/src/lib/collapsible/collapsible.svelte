<script lang="ts">
  import type {
    CollapsibleProps,
    CollapsibleStore,
  } from './types.js'

  import './collapsible.css'

  const {
    content,
    class: classList = '',
    isOpen = true,
    tabIndex = 0,
    title
  } : CollapsibleProps = $props()

  const open: CollapsibleStore = $state({isOpen})

  const getCollapsibleClicked = function(eventTarget: HTMLElement | null) {
    if (!eventTarget) {
      return null
    }
    while (eventTarget && eventTarget.tagName !== "SVEACOLLAPSIBLETITLE") {
      eventTarget = eventTarget.parentNode as HTMLElement;
    }
    return eventTarget;
  };

  const flipCollapsible = (e: Event) => {
    if (e instanceof KeyboardEvent
        && e.key !== 'Enter') {
      return
    }

    const target: HTMLElement | null = getCollapsibleClicked(e.target as HTMLElement)

    if (!target) {
      return
    }
    open.isOpen = !!(1 - (parseInt(target?.dataset?.open ?? '0')))
  }

  
</script>

<sveacollapsible class={classList} >
  <sveacollapsibletitle data-open={(open.isOpen) ? 1 : 0}
    onclick={flipCollapsible}
    onkeyup={flipCollapsible}
    role='button'
    tabindex={tabIndex} >
    {#if title}
      {@render title()}
    {/if}
    <spacer></spacer>
    <sveacollapsiblecontrol class:closed={!open.isOpen}
      class="iconoir-arrow-up-tag">
  </sveacollapsibletitle>
  {#if open.isOpen}
    <sveacollapsiblecontent>
      {@render content()}
    </sveacollapsiblecontent>
  {/if}
</sveacollapsible>