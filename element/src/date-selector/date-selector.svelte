<script lang="ts">
  import {
    createFieldValidator,
    i18n,
    ValidatorStore,
    validDateValidator,
  } from '@sveadmin/common'
  
  import {
    Button,
  } from '../main.js'

  import DateField from './date-field.svelte'
  import DateSelectorTabs from './date-selector-tabs.svelte'
  import DayGrid from './day-grid.svelte'
  import HourSelector from './hour-selector.svelte'
  import MinuteSelector from './minute-selector.svelte'

  import {
    prepareChageSelectorVisiblity,
    prepareDayEdited,
    prepareHideSelector,
    prepareHourEdited,
    prepareMinuteEdited,
    prepareMonthEdited,
    prepareSecondEdited,
    prepareYearEdited,
  } from './action/index.js'

  import {
    typeInToDatePart,
  } from './helper/index.js'

  import {
    getDateDisplayStore,
  } from './store.js'

  import {
    DATE_SELECTOR__VIEW_DAY_GRID,
    DATE_SELECTOR__VIEW_HOURS,
    DATE_SELECTOR__VIEW_MINUTES,
    DateSelectorDisplayStore,
    DateSelectorView,
    TypeIn,
    TYPE_IN__YEAR_FULL,
    TYPE_IN__MONTH_SHORT,
    TYPE_IN__DAY,
    TYPE_IN__HOUR_24,
    TYPE_IN__MINUTE,
    TYPE_IN__ALLOWED,
    TYPE_IN__YEAR_SHORT,
    TYPE_IN__MONTH_FULL,
    TYPE_IN__HOUR_12,
    TYPE_IN__SECOND,
  } from './types.js'

  import * as translations from './translation/index.js'

  i18n.addMultipleLocales(translations)

  export let format: string = 'yyyy-mm-dd HH-MM-ss',
    getValue: {() : Date | string | null} = null,
    id: string = 'date-selector',
    isInvalidDateAllowed: boolean = false,
    isTimeChangeable: boolean = true,
    selected: Date = new Date(),
    selectedView: DateSelectorView = DATE_SELECTOR__VIEW_DAY_GRID,
    typeInFields: Array<TypeIn | string> = [
      TYPE_IN__YEAR_FULL,
      '-',
      TYPE_IN__MONTH_SHORT,
      '-',
      TYPE_IN__DAY,
      ' ',
      TYPE_IN__HOUR_24,
      ':',
      TYPE_IN__MINUTE,
    ],
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
    value: (!value
      && typeof getValue === 'function')
      ? getValue()
      : value,
  })

  let instances: {[key: TypeIn] : DateField} = {}

  const changeSelectorVisibility = prepareChageSelectorVisiblity(displayStore)
  const hideSelector = prepareHideSelector(displayStore)

  const getValueFromStore = () => {
    value = displayStore.getSelectedDate()
    displayStore.setDisplayValue(value)
    Object.keys(instances).forEach((type) =>  {
      instances[type].setValue(displayStore.getByDatePart(typeInToDatePart(type)))
    })
  }

  const dayEdited = prepareDayEdited(displayStore, getValueFromStore)
  const hourEdited = prepareHourEdited(displayStore, getValueFromStore)
  const minuteEdited = prepareMinuteEdited(displayStore, getValueFromStore)
  const monthEdited = prepareMonthEdited(displayStore, getValueFromStore)
  const secondEdited = prepareSecondEdited(displayStore, getValueFromStore)
  const yearEdited = prepareYearEdited(displayStore, getValueFromStore)

  const typeInChanges = {
    [TYPE_IN__DAY]: dayEdited,
    [TYPE_IN__HOUR_12]: hourEdited,
    [TYPE_IN__HOUR_24]: hourEdited,
    [TYPE_IN__MINUTE]: minuteEdited,
    [TYPE_IN__SECOND]: secondEdited,
    [TYPE_IN__MONTH_FULL]: monthEdited,
    [TYPE_IN__MONTH_SHORT]: monthEdited,
    [TYPE_IN__YEAR_FULL]: yearEdited,
    [TYPE_IN__YEAR_SHORT]: yearEdited,
  }

  const setValue = () => {
  console.log('SVSV', $displayStore.selected)
    const isValid = dateValidator({value:$displayStore.selected})
    if (!isValid.valid) {
      return
    }
    getValueFromStore()
    hideSelector()
  }
</script>

<datedisplay {id}>
  <datetypein>
    {#each typeInFields as type}
      {#if TYPE_IN__ALLOWED.indexOf(type) !== -1}
        <DateField
          onBlur={typeInChanges[type]}
          onFocus={hideSelector}
          bind:this={instances[type]}
          {type}
          value={displayStore.getByDatePart(typeInToDatePart(type))} />
      {:else}
        <span>{type}</span>
      {/if}
    {/each}
  </datetypein>
  <Button callback={changeSelectorVisibility} />
  {#if isTimeChangeable
    && $displayStore.isSelectorVisible}
    <DateSelectorTabs {displayStore} />
  {/if}
  {#if $displayStore.isSelectorVisible}
    <dateselector>
      <dateselectorclose on:click={hideSelector} on:keyup={hideSelector}></dateselectorclose>
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_DAY_GRID}
        <DayGrid {displayStore}
          {isTimeChangeable}
          on:selectionFinished={setValue}
          {validators}
          {weekStartsOn}
          />
      {/if}
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_HOURS}
        <HourSelector {displayStore} />
      {/if}
      {#if $displayStore.selectedView === DATE_SELECTOR__VIEW_MINUTES}
        <MinuteSelector {displayStore} on:selectionFinished={setValue} />
      {/if}
      <selectedtime>{$displayStore.displaySelectedUTC} (UTC)</selectedtime>
      <selectedlocaltime>{$displayStore.displaySelected} (local)</selectedlocaltime>
      <input type="button" value="Set" on:click={setValue} />
    </dateselector>
  {/if}
</datedisplay>

<style global src="./date-selector.css"></style>