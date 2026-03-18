import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

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

import type {
  TextDisplayPartNumber,
} from '$lib/number/index.js'

import {
  TEXT_DISPLAY_TYPE_TEXT,
} from '../types.js'

import type {
  TextDisplayPartObjects,
  TextDisplayPartText,
} from '../types.js'

const placeholderToken = /\$\([^\)]*\)|'|"[^"]*"|'[^']*/g

export function parseLiteralShortCuts(beingParsed: string) : TextDisplayPartObjects[] | null
{
  let parsedIndex = 0
  const matches = beingParsed.matchAll(placeholderToken)
  const partsToBeAdded : TextDisplayPartObjects[] = []
  let dynamicPartsCount = 0

  for (const match of matches) {
    if (match.index > parsedIndex) {
      partsToBeAdded.push({
        type: COMPONENT_LITERAL,
        value: beingParsed.substring(parsedIndex, match.index)
      })
    }
    if (match[0].substring(0, 2) === '$(') {
      const defintion = match[0].substring(2, match[0].length - 1)
      const definitionPieces = defintion.split(':')
      const currentDefintion = definitionPieces.shift()
      switch (currentDefintion) {
        case TEXT_DISPLAY_TYPE_NUMBER:
        case TEXT_DISPLAY_TYPE_TEXT:
          const newPartTextNumber : TextDisplayPartNumber | TextDisplayPartText = {
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
            options: {
              format: definitionPieces.join(':'),
            },
            type: currentDefintion,
          }
          if (dynamicPartsCount > 0) {
            newPartDate.index = dynamicPartsCount
          }
          dynamicPartsCount++
          partsToBeAdded.push(newPartDate)
      }
    } else {
      // Matches escaped by ' or "
      partsToBeAdded.push({
        type: COMPONENT_LITERAL,
        value: beingParsed.substring(match.index + 1, match.index + match[0].length - 1)
      })
    }
    parsedIndex = match.index + match[0].length
  }
  if (parsedIndex < beingParsed.length) {
    partsToBeAdded.push({
      type: COMPONENT_LITERAL,
      value: beingParsed.substring(parsedIndex, beingParsed.length)
    })
  }
  return (partsToBeAdded.length === 0)
   ? null
   : partsToBeAdded
}