<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import CurrencyDisplay from './currency-display.svelte'
  import {
    normalizeArray,
  } from '$lib/helper/index.js'

  import {
    NUMBER_CURRENCY_DISPLAY_CODE,
    NUMBER_CURRENCY_DISPLAY_NAME,
    NUMBER_ROUNDING_MODE_TRUNC,
    NUMBER_STYLE_DECIMAL,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    parseLiteralShortCuts,
    prepareOnClick,
  } from '$lib/text-display/index.js'

  import type {
    TextDisplayPart,
  } from '$lib/text-display/index.js'

  import type {
    CurrencyDisplayProps,
    CurrencyDisplayWrappedProps,
  } from './types.js'

  import '$lib/number-display/number-display.css'

  let {
    class: classList = $bindable([]),
    containerClass = $bindable([]),
    currency,
    currencyDisplay,
    digitsToFractionRatio,
    fractionDigits,
    mask,
    onClick,
    style = $bindable([]),
    containerStyle = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : CurrencyDisplayWrappedProps = $props()


  if (!onClick) {
    onClick = prepareOnClick(() => value)
  }

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    localClasses: string[] = $state([]),
    containerClasses : string[] = $state(normalizeArray(containerClass, ' ')),
    containerStyles : string[] = $state(normalizeArray(containerStyle, ';')),
    digitsRatio: number | undefined = $state(),
    digitsCurrency: string | undefined = currency,
    fractionCurrency: string | undefined = currency,
    fractionsRatio: number | undefined = $state(),
    styles: string[] = $state(normalizeArray(style, ';'))

  let derivedClasses: string[] = $derived(classes.concat(localClasses)),
    fractionClasses : string[] = $derived.by(() => {
      const result = [...classes, 'fraction']
      if (fractionsRatio) {
        result.push('grid-span-' + fractionsRatio)
      }
      return result
    }),
    fractionStyles : string[] = $derived([...styles, 'text-align:left'])

  

  const childrenProps: Omit<CurrencyDisplayProps, 'value'> = {
    currencyDisplay,
    ...passthrough,
  }
  if (typeof mask === 'string') {
    const expandedParts = parseLiteralShortCuts(mask)
    if (expandedParts !== null) {
      mask = expandedParts
    }
  }

  if (!Array.isArray(mask)) {
    mask = [{
      type: TEXT_DISPLAY_TYPE_NUMBER,
    }]
  }

  if (digitsToFractionRatio) {
    [digitsRatio, fractionsRatio] = digitsToFractionRatio

    if (digitsRatio + fractionsRatio !== 12) {
      const scale = 12 / (digitsRatio + fractionsRatio)
      digitsRatio = Math.round(digitsRatio * scale)
      fractionsRatio = Math.round(fractionsRatio * scale)
    }

    const firstNumber = mask.find((currentPart: TextDisplayPart) => typeof currentPart !== 'string' && currentPart.type === TEXT_DISPLAY_TYPE_NUMBER)

    if (firstNumber) {
      if (!firstNumber.options) {
        firstNumber.options = {};
      }
      firstNumber.options.style = NUMBER_STYLE_DECIMAL
      firstNumber.options.maximumFractionDigits = 0
      firstNumber.options.roundingMode = NUMBER_ROUNDING_MODE_TRUNC

      if (currencyDisplay === NUMBER_CURRENCY_DISPLAY_NAME) {
        digitsCurrency = undefined
      } else {
        fractionCurrency = undefined
      }
    }
    
    localClasses.push('grid-span-' + digitsRatio, 'digits')
  }

</script>

{#snippet mainValue(fractionDigits: number | [number, number] = 3)}
  <sveanumbercontainer class={derivedClasses.join(' ')}
    onclick={onClick}
    role="presentation"
    style={styles.join(';')} >
    <CurrencyDisplay bind:value={value}
      currency={digitsCurrency}
      {fractionDigits}
      {mask}
      {...childrenProps} />
  </sveanumbercontainer>
{/snippet}

{#if digitsRatio}
  <sveadigitscontainer class={containerClasses.join(' ')} style={containerStyles.join(';')}>
    {@render mainValue(0)}
    <sveanumbercontainer class={fractionClasses.join(' ')}
      onclick={onClick}
      role="presentation"
      style={fractionStyles.join(';')} >
      <CurrencyDisplay
        currency={fractionCurrency}
        {fractionDigits}
        removeIntegerPart={true}
        {value}
        {...childrenProps} />
    </sveanumbercontainer>
  </sveadigitscontainer>
{:else}
  {@render mainValue(fractionDigits)}
{/if}
