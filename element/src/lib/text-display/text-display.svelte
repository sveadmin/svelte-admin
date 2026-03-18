<script lang="ts">
  import {
    i18n as defaultI18n,
  } from '@sveadmin/common'
  
  import * as translations from '$lib/date/translation/index.js'

  import type {
    TextDisplayProps,
    TextDisplayMask,
  } from './types.js'

  import {
    TEXT_DISPLAY_TYPE_TEXT,
  } from './types.js'

  import {
    prepareParseValue,
  } from '$lib/literal/index.js'


  let {
    dateTimeDefinitions,
    i18n,
    mask = $bindable([{type: TEXT_DISPLAY_TYPE_TEXT}]),
    refreshInterval,
    splitter,
    value = $bindable(''),
  } : TextDisplayProps = $props()

  if (!i18n) {
    i18n = defaultI18n
    i18n.addMultipleLocales(translations)
  }

  let parseValue: (
    mask: TextDisplayMask | string,
    value: any,
  ) => string = $state((
    mask: TextDisplayMask | string,
    value: any,
  ) => '')
  
  async function loadParseValue() {
    parseValue = await prepareParseValue(dateTimeDefinitions, splitter)
  }

  let displayValue = $state('')

  $effect(() => {
    let interval:  number
    if (refreshInterval
      && refreshInterval > 0) {
      interval = setInterval(() => {
        displayValue = parseValue(
          mask,
          value
        )
      }, refreshInterval)

      return () => {
        clearInterval(interval)
      }
    } 
  })

  $effect(() => {
    displayValue = parseValue(
      mask,
      value
    )
  })
  loadParseValue()
</script>

{displayValue}