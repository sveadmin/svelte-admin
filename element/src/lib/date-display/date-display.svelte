<script lang="ts">
  import {
    dateSplitter,
    TextDisplay,
    TEXT_DISPLAY_TYPE_DATE_TIME,
    type TextDisplayPartDateTime,
    type DateTimeOptions,
  } from '$lib/text-display/index.js'

  import type {
    DateDisplayProps,
  } from './types.js'

  const {
    calendar,
    format,
    locale,
    refreshInterval,
    timeZone,
    value = $bindable(null)
  } : DateDisplayProps = $props()

  const convertDate = (possibleDate: null | Date | string) => {
    if (possibleDate === null) {
      return null
    }
    return (possibleDate instanceof Date)
      ? possibleDate
      : new Date(possibleDate)
  }

  let date: Date | null | Array<Date | null> = $derived.by(() => {
    if (Array.isArray(value)) {
      return value.map(convertDate)
    }

    return convertDate(value)
  })

  const mask: TextDisplayPartDateTime[] = [
    {
      type: TEXT_DISPLAY_TYPE_DATE_TIME
    }
  ]

  if (locale) {
    mask[0].locale = locale
  }

  const options: DateTimeOptions = {}
  if (calendar) {
    options.calendar = calendar
  }
  if (format) {
    options.format = format
  }
  if (timeZone) {
    options.timeZone = timeZone
  }

  if (Object.keys(options).length > 0) {
    mask[0].options = options
  }
</script>
{#if date !== null}
  <TextDisplay 
    {mask}
    {refreshInterval}
    splitter={dateSplitter}
    value={date} />
{/if}