import { COMPONENT_BUTTON } from './button/types.js'
import { COMPONENT_CHECKBOX_SWITCH } from './checkbox-switch/types.js'
import { COMPONENT_CURRENCY_INPUT } from './currency-input/types.js'
import { COMPONENT_DATE_DISPLAY } from './date-display/types.js'
import { COMPONENT_DATE_SELECTOR } from './date-selector/types.js'
import { COMPONENT_DROPDPWN_MULTI } from './dropdown-multi/types.js'
import { COMPONENT_DROPDOWN_SEARCH } from './dropdown-search/types.js'
import { COMPONENT_INTERVAL_DISPLAY } from './interval-display/types.js'
import { COMPONENT_JSON } from './json/types.js'
import { COMPONENT_LINK } from './link/types.js'
import { COMPONENT_LOCALE_SELECTOR } from './locale-selector/types.js'
import { COMPONENT_NUMBER_DISPLAY } from './number-display/types.js'
import { COMPONENT_NUMBER_INPUT } from './number-input/types.js'
import { COMPONENT_TAG } from './tag/types.js'
import { COMPONENT_TEXT_INPUT } from './text-input/types.js'
import { COMPONENT_TIMER } from './timer/types.js'
import { COMPONENT_TRANSLATION_INPUT } from './translation-input/types.js'

export const ALLOWED_COMPONENTS = [
  COMPONENT_BUTTON,
  COMPONENT_CHECKBOX_SWITCH,
  COMPONENT_CURRENCY_INPUT,
  COMPONENT_DATE_DISPLAY,
  COMPONENT_DATE_SELECTOR,
  COMPONENT_DROPDPWN_MULTI,
  COMPONENT_DROPDOWN_SEARCH,
  COMPONENT_INTERVAL_DISPLAY,
  COMPONENT_JSON,
  COMPONENT_LINK,
  COMPONENT_LOCALE_SELECTOR,
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_NUMBER_INPUT,
  COMPONENT_TAG,
  COMPONENT_TEXT_INPUT,
  COMPONENT_TIMER,
  COMPONENT_TRANSLATION_INPUT,
]

export type Component = typeof ALLOWED_COMPONENTS[number]