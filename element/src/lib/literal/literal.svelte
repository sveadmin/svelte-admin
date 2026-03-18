<script lang="ts">
  import {
    i18n as defaultI18n,
  } from '@sveadmin/common'

  import type {
    SveadminComponentMask,
  } from '$lib/types.js'
  
  import * as translations from '$lib/date/translation/index.js'

  import type {
    LiteralDisplayProps,
  } from './types.js'

  import {
    prepareParseValue,
  } from './helper/index.js'


  let {
    dateTimeDefinitions,
    i18n,
    mask = $bindable(),
    refreshInterval,
    splitter,
    value = $bindable(''),
  } : LiteralDisplayProps = $props()

  if (!i18n) {
    i18n = defaultI18n
    i18n.addMultipleLocales(translations)
  }

  let parseValue: (
    mask: SveadminComponentMask | string | undefined,
    value: any,
  ) => string = $state((
    mask: SveadminComponentMask | string | undefined,
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