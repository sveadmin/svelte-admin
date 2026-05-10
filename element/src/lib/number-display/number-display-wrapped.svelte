<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import NumberDisplay from './number-display.svelte'

  import type {
    SveadminComponent,
  } from '$lib/types.js'

  import {
    normalizeArray,
    propertyMerger,
    wrapOnMouseAction,
  } from '$lib/helper/index.js'

  import {
    parseLiteralShortCuts,
  } from '$lib/literal/index.js'

  import {
    NUMBER_ROUNDING_MODE_TRUNC,
    NUMBER_STYLE_DECIMAL,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/number/index.js'

  import {
    prepareCopyValue,
  } from '$lib/text-display/index.js'

  import {
    getDecimalFractionRatio,
  } from './helper/index.js'

  import type {
    NumberDisplayWrappedProps,
  } from './types.js'

  import './number-display.css'

  let {
    childrenConfig,
    class: classList = $bindable([]),
    containerClass = $bindable([]),
    digitWidth = $bindable(12),
    displayComponent = NumberDisplay,
    fractionDigits,
    fractionWidth = $bindable(),
    mask = $bindable('$(number)'),
    onClick,
    style = $bindable([]),
    containerStyle = $bindable([]),
    value = $bindable(),
    ...passthrough
  } : NumberDisplayWrappedProps = $props()

  let Component = displayComponent //This is needed so Svelte can render it as a tag

  const digitConfig = $derived(propertyMerger(
    childrenConfig?.digit,
    childrenConfig?.[0],
    passthrough
  ))

  const fractionConfig = $derived(propertyMerger(
    childrenConfig?.fraction,
    childrenConfig?.[1],
    passthrough
  ))

  let classes: string[] = $derived(normalizeArray(classList, ' ')),
    containerClasses : string[] = $state(normalizeArray(containerClass, ' ')),
    containerStyles : string[] = $state(normalizeArray(containerStyle, ';')),
    localClasses: string[] = $state([]),
    localFractionClasses: string[] = $state(['fraction']),
    onInputClick = wrapOnMouseAction(prepareCopyValue(() => value), onClick),
    styles: string[] = $state(normalizeArray(style, ';'))

  let derivedClasses: string[] = $derived(classes.concat(localClasses)),
    derivedFractionClasses: string[] = $derived(classes.concat(localFractionClasses)),
    digitWidthRatio : number = $derived(getDecimalFractionRatio(digitWidth, fractionWidth) ?? 12),
    expandedMask : SveadminComponent<any>[] = $derived.by(() => {
      if (typeof mask === 'string') {
        const expandedParts = parseLiteralShortCuts(mask)
        if (expandedParts !== null) {
          return expandedParts
        }
      }

      if (!Array.isArray(mask)) {
        return [{
          type: TEXT_DISPLAY_TYPE_NUMBER,
        }]
      }

      return mask as SveadminComponent<any>[]
    }),
    fractionStyles : string[] = $derived([...styles, 'text-align:left']),
    fractionWidthRatio : number | undefined = $derived(getDecimalFractionRatio(fractionWidth, digitWidth))

  $effect(() => {
    if (fractionWidthRatio) {
      localClasses = ['grid-span-' + digitWidthRatio, 'digit']
      localFractionClasses = ['grid-span-' + fractionWidthRatio, 'fraction']

      const firstNumber = expandedMask.find((currentPart: SveadminComponent<any>) => typeof currentPart !== 'string' && currentPart.type === TEXT_DISPLAY_TYPE_NUMBER)
      if (firstNumber) {
        firstNumber.display = firstNumber?.display ?? {}
        firstNumber.display.config = firstNumber.display?.config ?? {}
        // firstNumber.display.config.style = NUMBER_STYLE_DECIMAL
        firstNumber.display.config.maximumFractionDigits = 0
        firstNumber.display.config.roundingMode = NUMBER_ROUNDING_MODE_TRUNC
      }
    }
  })
</script>

{#snippet mainValue(fractionDigits: number | [number, number] = 3)}
  <sveanumbercontainer class={derivedClasses.join(' ')}
    onclick={onInputClick}
    role="presentation"
    style={styles.join(';')} >
    <Component bind:value={value} {fractionDigits} mask={expandedMask} {...digitConfig} />
  </sveanumbercontainer>
{/snippet}

{#if fractionWidthRatio}
  <sveadigitscontainer class={containerClasses.join(' ')} style={containerStyles.join(';')}>
    {@render mainValue(0)}
    <sveanumbercontainer class={derivedFractionClasses.join(' ')}
      onclick={onInputClick}
      role="presentation"
      style={fractionStyles.join(';')} >
      <Component {fractionDigits} removeIntegerPart={true} {value} {...fractionConfig} />
    </sveanumbercontainer>
  </sveadigitscontainer>
{:else}
  {@render mainValue(fractionDigits)}
{/if}
