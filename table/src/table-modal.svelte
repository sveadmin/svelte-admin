<script lang="ts">
  import {
    getContext,
    SvelteComponent,
  } from 'svelte'

  import {
    derived,
  } from 'svelte/store'

  import {
    screen,
    ScreenComponent,
    ScreenData,
    SCREEN_TYPE_MODAL,
  } from '@sveadmin/common'

  import {
    TableContextKey,
  } from './types.js'

  export let contextKey: TableContextKey

  const {
    meta,
  } = getContext(contextKey)

  meta.updateAttribute('screenKey', 'table-' + contextKey.key)

  let hidingIntent: boolean = false,
    instance: typeof SvelteComponent,
    unsubscribes: Array<{() : void}> = []

  const currentModal: ScreenComponent = derived(
    screen,
    (currentValue: ScreenData) => currentValue.screens[$meta.screenKey]
      && currentValue.screens[$meta.screenKey].components
      && currentValue.screens[$meta.screenKey].components[0])

  $: if (instance && $currentModal && $currentModal.listeners) {
    for (let [key, listener] of Object.entries($currentModal.listeners)) {
      unsubscribes.push(instance.$on(key, listener))
    }
  }

  const clearHidingIntent = () => {
    hidingIntent = false
  }

  const setHidingIntent = () => {
    hidingIntent = true
  }

  const hideModal = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Escape') {
      return
    }
    if (!hidingIntent) {
      return
    }

    screen.clearComponent($meta.screenKey)
    unsubscribes.map(unsubscribe => unsubscribe())
    clearHidingIntent()
  }

  screen.setType($meta.screenKey, {fallbackType: SCREEN_TYPE_MODAL})
</script>

{#if $currentModal}
  <div class="tablemodal" on:keyup={hideModal} 
    on:mousedown={setHidingIntent}
    on:mouseup={hideModal} >
    <div class="tablemodalcontainer" on:mousedown|stopPropagation on:mouseup|stopPropagation={clearHidingIntent}>
      <div class="tablemodalborder">
        <svelte:component this={$currentModal.component} {...$currentModal.parameters} bind:this={instance} />
      </div>
      <div class="tableclosemodal"
        on:keyup={hideModal}
        on:mousedown={setHidingIntent}
        on:mouseup={hideModal} />
    </div>
  </div>
{/if}

<style global src="./table-modal.css"></style>