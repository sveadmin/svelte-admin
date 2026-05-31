<script lang="ts">
  import {
    dateSplitter,
    COMPONENT_DATE_TIME,
  } from '$lib/date/index.js'

  import type {
    ComponentDateTime,
    DateTimeDisplayProps,
  } from '$lib/date/index.js'

  import {
    mergeProperties
  } from '$lib/helper/index.js'

  import {
    TextDisplay,
  } from '$lib/text-display/index.js'

  import type {
    TextDisplayProps,
  } from '$lib/text-display/index.js'

  import {
    convertDate,
  } from './helper/index.js'

  import type {
    DateDisplayProps,
  } from './types.js'

  const {
    calendar,
    format,
    locale,
    refreshInterval,
    timeZone,
    value = $bindable(null),
    ...passthrough
  } : DateDisplayProps = $props()

  let date: Date | null | Array<Date | null> = $derived.by(() => {
    if (Array.isArray(value)) {
      return value.map(convertDate)
    }

    return convertDate(value)
  })

  const mask: ComponentDateTime[] = [{
    type: COMPONENT_DATE_TIME
  }]
  
  const config: DateTimeDisplayProps = {}

  if (locale) {
    config.locale = locale
  }

  if (calendar) {
    config.calendar = calendar
  }
  if (format) {
    config.format = format
  }
  if (timeZone) {
    config.timeZone = timeZone
  }

  if (Object.keys(config).length > 0) {
    mask[0].display = {
      config
    }
  }
</script>
{#if date !== null}
  <TextDisplay 
    {...passthrough}
    {mask}
    {refreshInterval}
    splitter={dateSplitter}
    value={date} />
{/if}