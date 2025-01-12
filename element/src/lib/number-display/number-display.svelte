<script lang="ts">
  // @ts-ignore: This is a functioning and correct import, sometimes TS does not understand svelte files
  import TextDisplay from '$lib/text-display/text-display.svelte'

  import {
    NUMBER_STYLE_DECIMAL,
    parseLiteralShortCuts,
    TEXT_DISPLAY_TYPE_NUMBER,
  } from '$lib/text-display/index.js'

  import type {
    NumberOptions,
    TextDisplayProps,
    TextDisplayPartObjects,
  } from '$lib/text-display/index.js'

  import type {
    NumberDisplayProps,
  } from './types.js'

  let {
    fractionDigits,
    locale,
    mask,
    removeIntegerPart,
    roundingMode,
    splitter,
    useGrouping,
    signDisplay,
    value = $bindable(),
    zeroPadded,
    ...passthrough
  } : NumberDisplayProps = $props()

  let options: NumberOptions = {}

  const childrenProps: Omit<TextDisplayProps, 'value'> = {
    ...passthrough,
  }

  if (fractionDigits !== undefined
    || removeIntegerPart !== undefined
    || roundingMode
    || signDisplay
    || useGrouping !== undefined
    || zeroPadded) {
    options = {
        style: NUMBER_STYLE_DECIMAL,
    }

    if (fractionDigits !== undefined) {
      if (Array.isArray(fractionDigits)) {
        if (fractionDigits[0] !== null) {
          options.maximumFractionDigits = fractionDigits[0]
        }
        options.minimumFractionDigits = fractionDigits[1]
      } else {
        options.maximumFractionDigits = fractionDigits
      }
    }

    if (removeIntegerPart !== undefined) {
      options.removeIntegerPart = removeIntegerPart
    }

    if (roundingMode) {
      options.roundingMode = roundingMode
    }

    if (useGrouping !== undefined) {
      options.useGrouping = useGrouping
    }

    if (zeroPadded
      && zeroPadded > 0
    ) {
      options.minimumIntegerDigits = zeroPadded
      options.useGrouping = false
    }

  }

  if (typeof mask === 'string') {
    const expandedParts = parseLiteralShortCuts(mask)
    if (expandedParts !== null) {
      mask = expandedParts.map((currentPart: TextDisplayPartObjects) => {
        if (currentPart.type !== TEXT_DISPLAY_TYPE_NUMBER) {
          return currentPart
        }
        return {
          locale,
          options: {
            ...currentPart?.options,
            ...options
          },
          type: TEXT_DISPLAY_TYPE_NUMBER,
        }
      })
    }
  }

  if (!mask) {
    mask = [{
      type: TEXT_DISPLAY_TYPE_NUMBER,
      options
    }]
  }
</script>

<TextDisplay {mask} {splitter} bind:value={value} {...childrenProps} />
