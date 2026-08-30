export * from './button/index.js'
export * from './checkbox-switch/index.js'
export * from './accordion/index.js'
export * from './cluster/index.js'
export * from './currency-input/index.js'
export * from './date-display/index.js'
export * from './date-interval-display/index.js'
export * from './date-selector/index.js'
export * from './dropdown-multi/index.js'
export * from './dropdown-search/index.js'
export * from './grid/index.js'
export * from './helper/index.js'
export * from './image/index.js'
export * from './input/index.js'
export * from './json/index.js'
export * from './link/index.js'
export * from './literal/index.js'
export * from './loader-on-body/index.js'
export * from './locale-selector/index.js'
export * from './number-display/index.js'
export * from './number-input/index.js'
export * from './password-input/index.js'
export * from './range-input/index.js'
export * from './svg/index.js'
export * from './tag/index.js'
export * from './text-display/index.js'
export * from './text-input/index.js'
export * from './textarea-display/index.js'
export * from './timer/index.js'
export * from './translation-input/index.js'

import { COMPONENT_BUTTON } from './button/index.js'
import { COMPONENT_CHECKBOX_SWITCH } from './checkbox-switch/index.js'
// import { COMPONENT_CURRENCY_INPUT } from './currency-input/index.js'
// import { COMPONENT_DATE_DISPLAY } from './date-display/index.js'
// import { COMPONENT_DATE_SELECTOR } from './date-selector/index.js'
// import { COMPONENT_DROPDPWN_MULTI } from './dropdown-multi/index.js'
// import { COMPONENT_DROPDOWN_SEARCH } from './dropdown-search/index.js'
// import { COMPONENT_IMAGE } from './image/index.js'
// import { COMPONENT_DATE_INTERVAL_DISPLAY } from './date-interval-display/index.js'
// import { COMPONENT_JSON } from './json/index.js'
// import { COMPONENT_LINK } from './link/index.js'
// import { COMPONENT_LOCALE_SELECTOR } from './locale-selector/index.js'
// import { COMPONENT_NUMBER_DISPLAY } from './number-display/index.js'
// import { COMPONENT_NUMBER_INPUT } from './number-input/index.js'
// import { COMPONENT_RANGE_INPUT } from './range-input/index.js'
// import { COMPONENT_SVG } from './svg/index.js'
// import { COMPONENT_TAG } from './tag/index.js'
// import { COMPONENT_TEXT_DISPLAY } from './text-display/index.js'
// import { COMPONENT_TEXT_INPUT } from './text-input/index.js'
// import { COMPONENT_TIMER } from './timer/index.js'
// import { COMPONENT_TRANSLATION_INPUT } from './translation-input/index.js'

export const ALLOWED_COMPONENTS = [
  COMPONENT_BUTTON,
  COMPONENT_CHECKBOX_SWITCH,
  // COMPONENT_CURRENCY_INPUT,
  // COMPONENT_DATE_DISPLAY,
  // COMPONENT_DATE_SELECTOR,
  // COMPONENT_DROPDPWN_MULTI,
  // COMPONENT_DROPDOWN_SEARCH,
  // COMPONENT_IMAGE,
  // COMPONENT_DATE_INTERVAL_DISPLAY,
  // COMPONENT_JSON,
  // COMPONENT_LINK,
  // COMPONENT_LOCALE_SELECTOR,
  // COMPONENT_NUMBER_DISPLAY,
  // COMPONENT_NUMBER_INPUT,
  // COMPONENT_RANGE_INPUT,
  // COMPONENT_SVG,
  // COMPONENT_TAG,
  // COMPONENT_TEXT_DISPLAY,
  // COMPONENT_TEXT_INPUT,
  // COMPONENT_TIMER,
  // COMPONENT_TRANSLATION_INPUT,
]

export type Component = typeof ALLOWED_COMPONENTS[number]

export * from './types.js'