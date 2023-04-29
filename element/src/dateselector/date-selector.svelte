<script lang="ts">
  import dateFormat from 'dateformat'
  import {
    createFieldValidator,
    i18n,
    IsValid,
    ValidatorStore,
    validDateValidator,
  } from '@sveadmin/common'
  
  import {
    DropdownSearch,
    Button,
  } from '../main'

  import {
    prepareChageSelectorVisiblity,
    prepareChageSelectorView,
    prepareHideSelector,
  } from './action'

  import {
    generateMonthLookup,
    prepareGenerateDayGrid,
  } from './helper'

  import {
    getDateDisplayStore,
  } from './store'

  import {
    DATE_PART__DAY,
    DATE_PART__HOUR,
    DATE_PART__MINUTE,
    DATE_PART__MONTH,
    DATE_PART__YEAR,
    DatePart,
    DATE_SELECTOR__VIEW_DAY_GRID,
    DATE_SELECTOR__VIEW_HOURS,
    DATE_SELECTOR__VIEW_MINUTES,
    DateSelectorDisplayStore,
    DateSelectorView,
    hoursOuterRing,
    hoursInnerRing,
    minutesOuterRing,
    minutesInnerRing,
  } from './types'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  export let format: string = 'yyyy-mm-dd HH-MM-ss',
    id: string = 'date-selector',
    isInvalidDateAllowed: boolean = false,
    isTimeChangeable: boolean = true,
    selected: Date = new Date(),
    selectedView: DateSelectorView = DATE_SELECTOR__VIEW_DAY_GRID,
    validators: ValidatorStore = createFieldValidator([]),
    value: Date | string | null = null,
    weekStartsOn: number = 1

  const dateValidator = validDateValidator()
  if (!isInvalidDateAllowed) {
    validators.prependValidator(dateValidator)
  }

  const displayStore: DateSelectorDisplayStore = getDateDisplayStore({
    format,
    selected,
    selectedView,
    validators,
    value,
  })

  let dayGrid: Date[][] = [[]]


  const monthLookup = generateMonthLookup()
  const generateDayGrid = prepareGenerateDayGrid(weekStartsOn)

  const changeSelectorVisibility = prepareChageSelectorVisiblity(displayStore)
  const changeSelectorView = prepareChageSelectorView(displayStore)
  const hideSelector = prepareHideSelector(displayStore)

  displayStore.subscribe(currentValue => {
    dayGrid = generateDayGrid(currentValue.selected)
  })

  const yearEdited = (event: Event) => {
    const target = event.target as HTMLInputElement
    // value = setDatePart(value as Date, DATE_PART__YEAR, parseInt(target.value))
    displayStore.setSelectedDatePart(DATE_PART__YEAR, parseInt(target.value))
  }

  const monthEdited = (event: Event) => {
    const target = event.target as HTMLInputElement
    // value = setDatePart(value as Date, DATE_PART__MONTH, parseInt(target.value))
    displayStore.setSelectedDatePart(DATE_PART__MONTH, parseInt(target.value))
  }

  const dayEdited = (event: Event) => {
    const target = event.target as HTMLInputElement
    // value = setDatePart(value as Date, DATE_PART__DAY, parseInt(target.value))
    displayStore.setSelectedDatePart(DATE_PART__DAY, parseInt(target.value))
  }

  const hourEdited = (event: Event) => {
    const target = event.target as HTMLInputElement
    // value = setDatePart(value as Date, DATE_PART__HOUR, parseInt(target.value))
    displayStore.setSelectedDatePart(DATE_PART__HOUR, parseInt(target.value))
  }

  const minuteEdited = (event: Event) => {
    const target = event.target as HTMLInputElement
    // value = setDatePart(value as Date, DATE_PART__MINUTE, parseInt(target.value))
    displayStore.setSelectedDatePart(DATE_PART__MINUTE, parseInt(target.value))
  }

  const setValue = () => {
  console.log('SVSV', $displayStore.selected)
    const isValid = dateValidator({value:$displayStore.selected})
    if (!isValid.valid) {
      return
    }
    value = new Date(selected.getTime())
    hideSelector()
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
      setValue()
    } else {
      displayStore.setSelectedView(DATE_SELECTOR__VIEW_HOURS)
    }
  }

  const hourSelected = (event: MouseEvent) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement
    //TODO: make selection UTC!
    displayStore.setSelectedDatePart(DATE_PART__HOUR, parseInt(target.dataset.hour))
    displayStore.setSelectedView(DATE_SELECTOR__VIEW_MINUTES)
  }

  const minuteSelected = (event: MouseEvent) => {
    if (event instanceof KeyboardEvent
      && event.code !== 'Enter') {
      return
    }
    const target = event.target as HTMLElement
    //TODO: make selection UTC!
    displayStore.setSelectedDatePart(DATE_PART__HOUR, parseInt(target.dataset.minute))
    displayStore.setSelectedView(DATE_SELECTOR__VIEW_DAY_GRID)
    setValue()
  }
</script>

<datedisplay {id}>
  <datetypein>
    <input
      class="dateTypeIn double"
      value={$displayStore.displayYear}
      on:focus={hideSelector}
      on:blur={yearEdited} />
    <span>-</span>
    <input
      class="dateTypeIn"
      value={$displayStore.displayMonth}
      on:focus={hideSelector}
      on:blur={monthEdited} />
    <span>-</span>
    <input
      class="dateTypeIn"
      value={$displayStore.displayDay}
      on:focus={hideSelector}
      on:blur={dayEdited} />
  {#if isTimeChangeable}
    <span> </span>
    <input
      class="dateTypeIn"
      value={$displayStore.displayHour}
      on:focus={hideSelector}
      on:blur={hourEdited} />
    <span>:</span>
    <input
      class="dateTypeIn"
      value={$displayStore.displayMinute}
      on:focus={hideSelector}
      on:blur={minuteEdited} />
  {/if}
  </datetypein>
  <Button callback={changeSelectorVisibility} />
  {#if $displayStore.isSelectorVisible}
    {#if isTimeChangeable}
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
    {/if}
    <dateselector>
      <dateselectorclose on:click={hideSelector} on:keyup={hideSelector}></dateselectorclose>
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_DAY_GRID}
        {$displayStore.selectedYear}
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
          on:keyup={monthSetToNext}></columnaction>
        <daygrid>
          {#each dayGrid as week}
            {#each week as day}
              <day
                class:highlighted={day.getUTCMonth() === selected.getUTCMonth()}
                class:selected={day.getUTCFullYear() === selected.getUTCFullYear()
                  && day.getUTCMonth() === selected.getUTCMonth()
                  && day.getUTCDate() === selected.getUTCDate()}
                data-year={day.getUTCFullYear() - selected.getUTCFullYear()}
                data-month={day.getUTCMonth() - selected.getUTCMonth()}
                data-day={day.getUTCDate()}
                data-inactive={!dateValidator({value: day}).valid}
                on:click={daySelected}
                on:keyup={daySelected}
                >{day.getUTCDate()} </day>
            {/each}
          {/each}
        </daygrid>
      {/if}
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_HOURS}
        <clockface>
        {#each hoursInnerRing as hour, index}
          <clockvalue
            class="inner col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
            class:selected="{parseInt(hour) == $displayStore.selectedHour}"
            data-hour={parseInt(hour)}
            on:click={hourSelected}
            on:keyup={hourSelected}
          >
              {hour}
          </clockvalue>
        {/each}
        {#each hoursOuterRing as hour, index}
          <clockvalue
            class="outer col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
            class:selected="{parseInt(hour) == $displayStore.selectedHour}"
            data-hour={parseInt(hour)}
            on:click={hourSelected}
            on:keyup={hourSelected}
          >
              {hour}
          </clockvalue>
        {/each}
        </clockface>
      {/if}
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_MINUTES}
        <clockface>
        {#each minutesInnerRing as minute, index}
          {#if minute}
            <clockvalue
              class="inner col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
              class:selected="{parseInt(minute) == $displayStore.selectedMinute}"
              data-minute={parseInt(minute)}
              on:click={minuteSelected}
              on:keyup={minuteSelected}
            >
                {minute}
            </clockvalue>
          {/if}
        {/each}
        {#each minutesOuterRing as minute, index}
          {#if minute}
            <clockvalue
              class="outer col{(index + 3) % 12 - ((index + 3) % 12 - (index + 3) % 6) / 3 * ((index + 3) % 6)} row{index % 12 - (index % 12 - index % 6) / 3 * (index % 6)}"
              class:selected="{parseInt(minute) == $displayStore.selectedMinute}"
              data-minute={parseInt(minute)}
              on:click={minuteSelected}
              on:keyup={minuteSelected}
            >
                {minute}
            </clockvalue>
          {/if}
        {/each}
        </clockface>
      {/if}
      <selectedtime>{$displayStore.displaySelectedUTC} (UTC)</selectedtime>
      <selectedlocaltime>{$displayStore.displaySelected} (local)</selectedlocaltime>
      <input type="button" value="Set" on:click={setValue} />
    </dateselector>
  {/if}
</datedisplay>

<style global src="./date-selector.css"></style>