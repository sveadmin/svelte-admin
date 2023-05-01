<script lang="ts">
  import {
    DATE_SELECTOR__VIEW_DAY_GRID,
    DATE_SELECTOR__VIEW_HOURS,
    DATE_SELECTOR__VIEW_MINUTES,
    DateSelectorDisplayStore,
  } from './types.js'

  import {
    prepareChageSelectorView,
  } from './action/index.js'

  export let displayStore: DateSelectorDisplayStore

  const changeSelectorView = prepareChageSelectorView(displayStore)

</script>

<dateselectortabcontainer>
  <dateselectortab
    class:selected={$displayStore.selectedView === DATE_SELECTOR__VIEW_DAY_GRID}
    data-view={DATE_SELECTOR__VIEW_DAY_GRID}
    on:click={changeSelectorView}
    on:keyup={changeSelectorView} >
    Date
  </dateselectortab>
  <dateselectortab
    class:selected={$displayStore.selectedView === DATE_SELECTOR__VIEW_HOURS}
    data-view={DATE_SELECTOR__VIEW_HOURS}
    on:click={changeSelectorView}
    on:keyup={changeSelectorView} >
    Hour
  </dateselectortab>
  <dateselectortab
    class:selected={$displayStore.selectedView === DATE_SELECTOR__VIEW_MINUTES}
    data-view={DATE_SELECTOR__VIEW_MINUTES}
    on:click={changeSelectorView}
    on:keyup={changeSelectorView} >
    Minute
  </dateselectortab>
</dateselectortabcontainer>

<style global src="./date-selector-tabs.css"></style>