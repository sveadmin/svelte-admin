import {
  TEXT_DISPLAY_TYPE_DATE,
  TEXT_DISPLAY_TYPE_DATE_TIME,
  TEXT_DISPLAY_TYPE_LITERAL,
  TEXT_DISPLAY_TYPE_NUMBER,
  TEXT_DISPLAY_TYPE_TEXT,
  TEXT_DISPLAY_TYPE_TIME,
} from '../types.js'

import type {
  DateTimeOptions,
  TextDisplayPartDate,
  TextDisplayPartDateTime,
  TextDisplayPartNumber,
  TextDisplayPartObjects,
  TextDisplayPartText,
  TextDisplayPartTime,
} from '../types.js'

const placeholderToken = /\${[^}]*}|'|"[^"]*"|'[^']*/g

export function parseLiteralShortCuts(beingParsed: string) : TextDisplayPartObjects[] | null
{
  let parsedIndex = 0
  const matches = beingParsed.matchAll(placeholderToken)
  const partsToBeAdded : TextDisplayPartObjects[] = []
  let dynamicPartsCount = 0

  for (const match of matches) {
    if (match.index > parsedIndex) {
      partsToBeAdded.push({
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: beingParsed.substring(parsedIndex, match.index)
      })
    }
    if (match[0].substring(0, 2) === '${') {
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
        case TEXT_DISPLAY_TYPE_DATE:
        case TEXT_DISPLAY_TYPE_DATE_TIME:
        case TEXT_DISPLAY_TYPE_TIME:
          const newPartDate : TextDisplayPartDate | TextDisplayPartDateTime | TextDisplayPartTime = {
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
        type: TEXT_DISPLAY_TYPE_LITERAL,
        value: beingParsed.substring(match.index + 1, match.index + match[0].length - 1)
      })
    }
    parsedIndex = match.index + match[0].length
  }
  if (parsedIndex < beingParsed.length) {
    partsToBeAdded.push({
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: beingParsed.substring(parsedIndex, beingParsed.length)
    })
  }
  return (partsToBeAdded.length === 0)
   ? null
   : partsToBeAdded
}