import {
  SvelteComponent
} from 'svelte';

import {
  COMPONENT_BUTTON,
  COMPONENT_CHECKBOX_SWITCH,
  COMPONENT_DATE_DISPLAY,
  COMPONENT_DATE_INTERVAL_DISPLAY,
  COMPONENT_DROPDOWN_SEARCH,
  COMPONENT_JSON,
  COMPONENT_LINK,
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_NUMBER_INPUT,
  COMPONENT_SVG,
  COMPONENT_TAG,
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_INPUT,
} from '@sveadmin/element'

import { 
  CellButton,
  CellCheckboxSwitch,
  CellDateDisplay,
  CellDateIntervalDisplay,
  CellDropdownSearch,
  CellImage,
  CellIntervalDisplay,
  CellJson,
  CellLink,
  CellNumberDisplay,
  CellNumberInput,
  CellSvg,
  CellTag,
  CellTextDisplay,
  CellTextInput,
  CellTextLookup,
} from '../element/index.js'

import {
  COMPONENT_TEXT_LOOKUP,
  CellComponent,
} from '../types.js'

export function getComponent(type: CellComponent) : typeof SvelteComponent
{
  switch (type) {
    case COMPONENT_DATE_INTERVAL_DISPLAY:
      return CellDateIntervalDisplay
    case COMPONENT_JSON:
      return CellJson
    case COMPONENT_LINK:
      return CellLink
    case COMPONENT_NUMBER_DISPLAY:
      return CellNumberDisplay
    case COMPONENT_NUMBER_INPUT:
      return CellNumberInput
    case COMPONENT_TEXT_DISPLAY:
      return CellTextDisplay
    case COMPONENT_TEXT_INPUT:
      return CellTextInput
    case COMPONENT_TEXT_LOOKUP:
      return CellTextLookup
  }
  return CellTextDisplay
}