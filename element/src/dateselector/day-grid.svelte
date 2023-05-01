<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import {
    ValidatorStore,
  } from '@sveadmin/common'

  import {
    DropdownSearch,
  } from '../main.js'

  import DateField from './date-field.svelte';

  import {
    prepareYearEdited,
  } from './action/index.js'

  import {
    DATE_PART__DAY,
    DATE_PART__MONTH,
    DATE_PART__YEAR,
    DATE_SELECTOR__VIEW_HOURS,
    DateSelectorDisplayStore,
    TYPE_IN__YEAR_FULL,
  } from './types.js'

  import {
    generateMonthLookup,
    prepareGenerateDayGrid,
  } from './helper/index.js'

  export let displayStore: DateSelectorDisplayStore,
    isTimeChangeable: boolean = true,
    validators: ValidatorStore,
    weekStartsOn: number = 1

  const dispatch = createEventDispatcher();

  const generateDayGrid = prepareGenerateDayGrid(weekStartsOn)
  const monthLookup = generateMonthLookup()
  const { validate } = validators

  let dayGrid: Date[][] = [[]]

  displayStore.subscribe(currentValue => {
  console.log('SUSUSUS', currentValue)
    dayGrid = generateDayGrid(currentValue.selected)
  })

  const yearEdited = prepareYearEdited(displayStore)

  const daySelected = (event: MouseEvent) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement

    displayStore.setSelectedDatePart(DATE_PART__YEAR, parseInt(target.dataset.year))
    displayStore.setSelectedDatePart(DATE_PART__MONTH, parseInt(target.dataset.month))
    displayStore.setSelectedDatePart(DATE_PART__DAY, parseInt(target.dataset.day))
    if (!isTimeChangeable) {
      dispatch('selectionFinished')
    } else {
      displayStore.setSelectedView(DATE_SELECTOR__VIEW_HOURS)
    }
  }

  const monthSelected = (event: CustomEvent<string | null>) => {
    displayStore.setSelectedDatePart(DATE_PART__MONTH, parseInt(event.detail) - 1)
  }

  const monthSetToPrevious = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    displayStore.setSelectedDatePart(DATE_PART__MONTH, $displayStore.selected.getUTCMonth() - 1)
  }

  const monthSetToNext = (event: Event) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    displayStore.setSelectedDatePart(DATE_PART__MONTH, $displayStore.selected.getUTCMonth() + 1)
  }

</script>
<DateField
  onBlur={yearEdited}
  type={TYPE_IN__YEAR_FULL}
  value={$displayStore.selectedYear.toString()} />
<columnaction
  class="deselectAll active"
  on:click={monthSetToPrevious}
  on:keyup={monthSetToPrevious}></columnaction>
<DropdownSearch
  isEmptyAllowed={false}
  clearValueOnInit={true}
  maxSuggestions={12}
  on:valueChanged={monthSelected}
  originalValue={$displayStore.selectedMonth}
  value={$displayStore.selectedMonth}
  values={monthLookup}
/>
<columnaction
  class="selectAll active"
  on:click={monthSetToNext}
  on:keyup={monthSetToNext}>
</columnaction>
<daygrid>
  {#each dayGrid as week}
    {#each week as day}
      <day
        class:highlighted={day.getUTCMonth() === $displayStore.selected.getUTCMonth()}
        class:selected={day.getUTCFullYear() === $displayStore.selected.getUTCFullYear()
          && day.getUTCMonth() === $displayStore.selected.getUTCMonth()
          && day.getUTCDate() === $displayStore.selected.getUTCDate()}
        data-year={day.getUTCFullYear()}
        data-month={day.getUTCMonth()}
        data-day={day.getUTCDate()}
        data-inactive={!validate({value: day}).valid}
        on:click={daySelected}
        on:keyup={daySelected}
        >
        {day.getUTCDate()}
      </day>
    {/each}
  {/each}
</daygrid>

<style global src="./day-grid.css"></style>