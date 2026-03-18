import type {
  SveadminComponent,
  SveadminComponentMask,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import {
  prepareParseDateFormat,
  prepareMaskOptionsReducer,
  COMPONENT_DAY,
  COMPONENT_DAY_PERIOD,
  COMPONENT_ERA,
  COMPONENT_FRACTIONAL_SECOND,
  COMPONENT_HOUR,
  COMPONENT_INTERVAL,
  COMPONENT_MINUTE,
  COMPONENT_MONTH,
  COMPONENT_SECOND,
  COMPONENT_TIME_ZONE_NAME,
  COMPONENT_WEEK,
  COMPONENT_WEEKDAY, 
  COMPONENT_YEAR,
  DEFAULT_LOCALE,
} from '$lib/date/index.js'

import type {
  ComponentDate,
  ComponentDateTime,
  ComponentTime,
} from '$lib/date/index.js'

import {
  TEXT_DISPLAY_TYPE_NUMBER,
} from '$lib/number/index.js'

import {
  TEXT_DISPLAY_TYPE_TEXT,
} from '$lib/text-display/types.js'

import {
  parseLiteralShortCuts,
} from './parse-literal-shortcuts.js'

/**
 * This function makes sure that whatever was supplied as a mask is extended to the full configuration
 * It will
 * - expand shortcuts when it references a specific component as placeholde eg.: $(text)
 * - expand date definitions to it is full form if shortcuts were used eg.: format: YYYY-mm-dd
 * 
 * Expansion of literal shortcuts will be expanded with date definitions when needed
 * 
 * @param parseDateFormat 
 * @returns 
 */

export async function prepareMaskPartReducer(parseDateFormat?: (
  maskPart: ComponentDate | ComponentDateTime | ComponentTime) => SveadminComponent[]
) : Promise<(
    aggregator: SveadminComponent[],
    currentPart: SveadminComponent | string
  ) => SveadminComponent[]>
{
  if (!parseDateFormat) {
    parseDateFormat = await prepareParseDateFormat()
  }

  return function maskPartReducer(
    aggregator: SveadminComponent[],
    currentPart: SveadminComponent | string
  ) : SveadminComponent[] {
    const parsingStack: SveadminComponentMask = [currentPart]
    let beingParsed: SveadminComponent | string
    do {
      beingParsed = parsingStack.shift()!

    // Parse string formats, mostly to see if there is an expansion
      if (typeof beingParsed === 'string') {
        const expandedLiteral = parseLiteralShortCuts(beingParsed)
        if (expandedLiteral === null) {
          aggregator.push({
            display: {
              config: {
                value: beingParsed
              }
            },
            type: COMPONENT_LITERAL,
          })
          continue
        }
        parsingStack.unshift(...expandedLiteral)
        continue
      }

    // Parse simple types
      if (beingParsed.type === COMPONENT_LITERAL
        || beingParsed.type === TEXT_DISPLAY_TYPE_NUMBER
        || beingParsed.type === TEXT_DISPLAY_TYPE_TEXT) {
        aggregator.push(beingParsed)
        continue
      }
      // Parse predefined date component types, making sure it does not overwrite original config by spreading it
      const normalizedPart: SveadminComponent = {
        ...beingParsed
      }

      // Locale is needed to calculate the basic setup for date formats if not supplied
      normalizedPart.display = normalizedPart?.display ?? {}
      normalizedPart.display.config = normalizedPart.display?.config ?? {}
      normalizedPart.display.config.locale = normalizedPart.display.config?.locale ?? DEFAULT_LOCALE

      switch (normalizedPart.type) {
        case COMPONENT_DAY:
        case COMPONENT_DAY_PERIOD:
        case COMPONENT_ERA:
        case COMPONENT_FRACTIONAL_SECOND:
        case COMPONENT_HOUR:
        case COMPONENT_INTERVAL:
        case COMPONENT_MINUTE:
        case COMPONENT_MONTH:
        case COMPONENT_SECOND:
        case COMPONENT_TIME_ZONE_NAME:
        case COMPONENT_WEEK:
        case COMPONENT_WEEKDAY:
        case COMPONENT_YEAR:
          aggregator.push(normalizedPart)
          continue
      }

    // Parse date format
      let partsToBeAdded : SveadminComponent[] = parseDateFormat(normalizedPart)
      const maskOptionsReducer = prepareMaskOptionsReducer(
        normalizedPart?.display?.config ?? {},
        normalizedPart.index
      )

      partsToBeAdded = partsToBeAdded.reduce(maskOptionsReducer, [])
      aggregator.push(...partsToBeAdded)
    } while (parsingStack[0])

    return aggregator
  }
}