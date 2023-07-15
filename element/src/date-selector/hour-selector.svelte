<script lang="ts">
  import {
    DATE_PART__HOUR,
    DATE_SELECTOR__VIEW_MINUTES,
    DateSelectorDisplayStore,
    hoursOuterRing,
    hoursInnerRing,
  } from './types.js'

  export let displayStore: DateSelectorDisplayStore

  const hourSelected = (event: MouseEvent) => {
    if (event instanceof KeyboardEvent
      && event.key !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement
    //TODO: make selection UTC!
    displayStore.setSelectedDatePart(DATE_PART__HOUR, parseInt(target.dataset.hour))
    displayStore.setSelectedView(DATE_SELECTOR__VIEW_MINUTES)
  }

</script>

<sveaclockface>
  {#each hoursInnerRing as hour, index}
    <sveaclockvalue
      class="inner col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
      class:selected="{parseInt(hour) == $displayStore.selectedHour}"
      data-hour={parseInt(hour)}
      on:click={hourSelected}
      on:keyup={hourSelected}
    >
      {hour}
    </sveaclockvalue>
  {/each}
  {#each hoursOuterRing as hour, index}
    <sveaclockvalue
      class="outer col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
      class:selected="{parseInt(hour) == $displayStore.selectedHour}"
      data-hour={parseInt(hour)}
      on:click={hourSelected}
      on:keyup={hourSelected}
    >
      {hour}
    </sveaclockvalue>
  {/each}
</sveaclockface>
