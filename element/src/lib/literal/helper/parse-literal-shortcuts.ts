import {
  COMPONENT,
} from '$lib/types.js'

import type {
  SveadminComponent,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '../types.js'

import {
  COMPONENT_DATE,
  COMPONENT_DATE_TIME,
  COMPONENT_TIME,
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
  COMPONENT_TEXT_DISPLAY,
} from '$lib/text-display/types.js'

const placeholderToken = /\$\([^\)]*\)|'|"[^"]*"|'[^']*/g

export function parseLiteralShortCuts(beingParsed: string) : SveadminComponent<any>[] | null
{
  let parsedIndex = 0
  const matches = beingParsed.matchAll(placeholderToken)
  const partsToBeAdded : SveadminComponent<any>[] = []
  let dynamicPartsCount = 0


  for (const match of matches) {
    if (match.index > parsedIndex) {
      partsToBeAdded.push({
        display: {
          config: {
            value: beingParsed.substring(parsedIndex, match.index)
          }
        },
        type: COMPONENT_LITERAL,
      })
    }
    if (match[0].substring(0, 2) === '$(') {
      const defintion = match[0].substring(2, match[0].length - 1)
      const definitionPieces = defintion.split(':')
      const currentDefintion = definitionPieces.shift()
      switch (currentDefintion) {
        case TEXT_DISPLAY_TYPE_NUMBER:
        case COMPONENT_TEXT_DISPLAY:
          const newPartTextNumber : SveadminComponent<any> = {
            type: currentDefintion,
          }
          if (dynamicPartsCount > 0) {
            newPartTextNumber.index = dynamicPartsCount
          }
          partsToBeAdded.push(newPartTextNumber)
          dynamicPartsCount++
          break
        case COMPONENT_DATE:
        case COMPONENT_DATE_TIME:
        case COMPONENT_TIME:
          const newPartDate : ComponentDate | ComponentDateTime | ComponentTime = {
            display: {
              config: {
                format: definitionPieces.join(':'),
              }
            },
            type: currentDefintion,
          }
          if (dynamicPartsCount > 0) {
            newPartDate.index = dynamicPartsCount
          }
          dynamicPartsCount++
          partsToBeAdded.push(newPartDate)
          break
        default:
          dynamicPartsCount++
          partsToBeAdded.push({
            name: currentDefintion,
            type: COMPONENT
          })
      }
    } else {
      // Matches escaped by ' or "
      partsToBeAdded.push({
        display: {
          config: {
            value: beingParsed.substring(match.index + 1, match.index + match[0].length - 1)
          },
        },
        type: COMPONENT_LITERAL,
      })
    }
    parsedIndex = match.index + match[0].length
  }
  if (parsedIndex < beingParsed.length) {
    partsToBeAdded.push({
      display: {
        config: {
          value: beingParsed.substring(parsedIndex, beingParsed.length)
        },
      },
      type: COMPONENT_LITERAL,
    })
  }

  return (partsToBeAdded.length === 0)
   ? null
   : partsToBeAdded
}