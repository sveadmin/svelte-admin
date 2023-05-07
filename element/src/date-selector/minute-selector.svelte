<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import {
    DATE_PART__MINUTE,
    DATE_PART__SECOND,
    DATE_SELECTOR__VIEW_DAY_GRID,
    DateSelectorDisplayStore,
    minutesOuterRing,
    minutesInnerRing,
  } from './types.js'

  export let displayStore: DateSelectorDisplayStore

  const dispatch = createEventDispatcher();

  const minuteSelected = (event: MouseEvent) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement
    //TODO: make selection UTC!
    displayStore.setSelectedDatePart(DATE_PART__MINUTE, parseInt(target.dataset.minute))
    displayStore.setSelectedDatePart(DATE_PART__SECOND, 0)
    displayStore.setSelectedView(DATE_SELECTOR__VIEW_DAY_GRID)
    dispatch('selectionFinished')
  }

</script>

<sveaclockface>
  {#each minutesInnerRing as minute, index}
    {#if minute}
      <sveaclockvalue
        class="inner col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
        class:selected="{parseInt(minute) == $displayStore.selectedMinute}"
        data-minute={parseInt(minute)}
        on:click={minuteSelected}
        on:keyup={minuteSelected}
      >
          {minute}
      </sveaclockvalue>
    {/if}
  {/each}
  {#each minutesOuterRing as minute, index}
    {#if minute}
      <sveaclockvalue
        class="outer col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
        class:selected="{parseInt(minute) == $displayStore.selectedMinute}"
        data-minute={parseInt(minute)}
        on:click={minuteSelected}
        on:keyup={minuteSelected}
      >
          {minute}
      </sveaclockvalue>
    {/if}
  {/each}
</sveaclockface>