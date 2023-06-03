import {
  SvelteComponent
} from 'svelte';

import {
  Component,
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
  COMPONENT_TEXT_LOOKUP,
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

export function getComponent(type: Component) : typeof SvelteComponent
{
  switch (type) {
    case COMPONENT_DATE_INTERVAL_DISPLAY:
      return CellDateIntervalDisplay
    case COMPONENT_NUMBER_DISPLAY:
      return CellNumberDisplay
    case COMPONENT_NUMBER_INPUT:
      return CellNumberInput
    case COMPONENT_TEXT_DISPLAY:
      return CellTextDisplay
    case COMPONENT_TEXT_INPUT:
      return CellTextInput
  }
  return CellTextDisplay
}