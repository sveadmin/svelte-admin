<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import UnitDisplay from './unit-display.svelte'

  import {
    normalizeArray,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'

  import {
    NUMBER_ROUNDING_MODE_TRUNC,
    NUMBER_STYLE_DECIMAL,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    parseLiteralShortCuts,
    prepareCopyValue,
  } from '$lib/text-display/index.js'

  import type {
    TextDisplayPart,
  } from '$lib/text-display/index.js'

  import type {
    UnitDisplayProps,
    UnitWrappedDisplayProps,
  } from './types.js'

  import '$lib/number-display/number-display.css'

  let {
    class: classList = $bindable([]),
    containerClass = $bindable([]),
    digitsToFractionRatio,
    fractionDigits,
    mask,
    onClick,
    style = $bindable([]),
    unit,
    containerStyle = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : UnitWrappedDisplayProps = $props()

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    containerClasses : string[] = $state(normalizeArray(containerClass, ' ')),
    containerStyles : string[] = $state(normalizeArray(containerStyle, ';')),
    digitsRatio: number,
    fractionsRatio: number | undefined = $state(),
    localClasses: string[] = $state([]),
    onInputClick = wrapOnMouseAction(prepareCopyValue(() => value), onClick),
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

  const childrenProps: Omit<UnitDisplayProps, 'value'> = {
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
    }

    localClasses.push('grid-span-' + digitsRatio, 'digits')
  }

</script>

{#snippet mainValue(fractionDigits: number | [number, number] = 3)}
  <sveanumbercontainer class={derivedClasses.join(' ')}
    onclick={onInputClick}
    role="presentation"
    style={styles.join(';')} >
    <UnitDisplay bind:value={value} {fractionDigits} {mask} {...childrenProps} />
  </sveanumbercontainer>
{/snippet}

{#if digitsRatio}
  <sveadigitscontainer class={containerClasses.join(' ')} style={containerStyles.join(';')}>
    {@render mainValue(0)}
    <sveanumbercontainer class={fractionClasses.join(' ')}
      onclick={onInputClick}
      role="presentation"
      style={fractionStyles.join(';')} >
      <UnitDisplay {fractionDigits} removeIntegerPart={true} {unit} {value} {...childrenProps} />
    </sveanumbercontainer>
  </sveadigitscontainer>
{:else}
  {@render mainValue(fractionDigits)}
{/if}
