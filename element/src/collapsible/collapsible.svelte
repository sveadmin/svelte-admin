<script lang="ts">
  import {
    writable,
  } from 'svelte/store'
  
  export let classList: string = $$restProps.class || '',
    isOpen:boolean = true

  const open = writable(isOpen)

  const getCollapsibleClicked = function(eventTarget) {
    while (eventTarget && eventTarget.tagName !== "SVEACOLLAPSIBLETITLE") {
      eventTarget = eventTarget.parentNode;
    }
    return eventTarget;
  };

  const flipCollapsible = (e: Event) => {
    if (e instanceof KeyboardEvent
        && e.key !== 'Enter') {
      return
    }

    const target: HTMLElement = getCollapsibleClicked(e.target)

    open.set(1 - target.dataset.open)
  }

  
</script>

<sveacollapsible class={classList} >
  <sveacollapsibletitle data-open={($open) ? 1 : 0}
    on:click={flipCollapsible}
    on:keyup={flipCollapsible} >
    <slot name="title">
    </slot>
    <spacer />
    <sveacollapsiblecontrol class:closed={!$open}
      class="iconoir-arrow-up-tag">
  </sveacollapsibletitle>
  {#if $open}
    <sveacollapsiblecontent>
      <slot name="content"></slot>
    </sveacollapsiblecontent>
  {/if}
</sveacollapsible>

<style global src="./collapsible.css"></style>