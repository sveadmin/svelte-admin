import Button from './button/button.svelte'
import CheckboxSwitch from './checkbox-switch/checkbox-switch.svelte'
import CurrencyInput from './currency-input/currency-input.svelte' 
import DateDisplay from './date-display/date-display.svelte'
import DateIntervalDisplay from './date-interval-display/date-interval-display.svelte'
import DateSelector from './date-selector/date-selector.svelte'
import DropdownMultiSelect from './dropdown-multi/dropdown-multi.svelte'
import DropdownSearch from './dropdown-search/dropdown-search.svelte'
import Image from './image/image.svelte'
import Json from './json/json.svelte'
import Link from './link/link.svelte'
import { enableLoaderOnBody } from './loader-on-body/enable-loader-on-body.js'
import LocaleSelector from './locale-selector/locale-selector.svelte'
import NumberDisplay from './number-display/number-display.svelte'
import NumberInput from './number-input/number-input.svelte'
import Svg from './svg/svg.svelte'
import Tag from './tag/tag.svelte'
import TextInput from './text-input/text-input.svelte'
import Timer from './timer/timer.svelte'
import TranslationInput from './translation-input/translation-input.svelte'
import { COMPONENT_BUTTON } from './button/types.js'
import { COMPONENT_CHECKBOX_SWITCH } from './checkbox-switch/types.js'
import { COMPONENT_CURRENCY_INPUT } from './currency-input/types.js'
import { COMPONENT_DATE_DISPLAY } from './date-display/types.js'
import { COMPONENT_DATE_INTERVAL_DISPLAY } from './date-interval-display/types.js'
import { COMPONENT_DATE_SELECTOR } from './date-selector/types.js'
import { COMPONENT_DROPDPWN_MULTI } from './dropdown-multi/types.js'
import { COMPONENT_DROPDOWN_SEARCH } from './dropdown-search/types.js'
import { COMPONENT_IMAGE } from './image/types.js'
import { COMPONENT_JSON } from './json/types.js'
import { COMPONENT_LINK } from './link/types.js'
import { COMPONENT_LOCALE_SELECTOR } from './locale-selector/types.js'
import { COMPONENT_NUMBER_DISPLAY } from './number-display/types.js'
import { COMPONENT_NUMBER_INPUT } from './number-input/types.js'
import { COMPONENT_SVG } from './svg/types.js'
import { COMPONENT_TAG } from './tag/types.js'
import { COMPONENT_TEXT_DISPLAY } from './text-display/types.js'
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
  COMPONENT_IMAGE,
  COMPONENT_DATE_INTERVAL_DISPLAY,
  COMPONENT_JSON,
  COMPONENT_LINK,
  COMPONENT_LOCALE_SELECTOR,
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_NUMBER_INPUT,
  COMPONENT_SVG,
  COMPONENT_TAG,
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_INPUT,
  COMPONENT_TIMER,
  COMPONENT_TRANSLATION_INPUT,
]

export {
  COMPONENT_BUTTON,
  COMPONENT_CHECKBOX_SWITCH,
  COMPONENT_CURRENCY_INPUT,
  COMPONENT_DATE_DISPLAY,
  COMPONENT_DATE_SELECTOR,
  COMPONENT_DROPDPWN_MULTI,
  COMPONENT_DROPDOWN_SEARCH,
  COMPONENT_IMAGE,
  COMPONENT_DATE_INTERVAL_DISPLAY,
  COMPONENT_JSON,
  COMPONENT_LINK,
  COMPONENT_LOCALE_SELECTOR,
  COMPONENT_NUMBER_DISPLAY,
  COMPONENT_NUMBER_INPUT,
  COMPONENT_SVG,
  COMPONENT_TAG,
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_INPUT,
  COMPONENT_TIMER,
  COMPONENT_TRANSLATION_INPUT,
}

export {
  Button,
  CheckboxSwitch,
  CurrencyInput,
  DateDisplay,
  DateSelector,
  DropdownMultiSelect,
  DropdownSearch,
  enableLoaderOnBody,
  Image,
  DateIntervalDisplay,
  Json,
  Link,
  LocaleSelector,
  NumberDisplay,
  NumberInput,
  Svg,
  Tag,
  TextInput,
  Timer,
  TranslationInput,
}

export type Component = typeof ALLOWED_COMPONENTS[number]

export * from './button/types.js'
export * from './checkbox-switch/types.js'
export * from './currency-input/types.js'
export * from './date-display/types.js'
export * from './date-interval-display/types.js'
export * from './date-selector/types.js'
export * from './dropdown-multi/types.js'
export * from './dropdown-search/types.js'
export * from './helper/types.js'
export * from './json/types.js'
export * from './link/types.js'
export * from './number-display/types.js'
export * from './number-input/types.js'
export * from './tag/types.js'
export * from './text-input/types.js'
export * from './translation-input/types.js'