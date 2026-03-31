import type {
  ComponentStoreData,
} from '$lib/component/index.js'

import {
  COMPONENT_BUTTON,
  Button,
  renderButton,
} from '$lib/button/index.js'

import type {
  ComponentSnippet,
} from '$lib/component/index.js'

import {
  COMPONENT_DROPDOWN_SEARCH,
  renderDropdownSearch,
} from '$lib/dropdown-search/index.js'

import {
  COMPONENT_IMAGE,
  COMPONENT_IMAGE_WRAPPED,
  Image,
  ImageWrapped,
  renderImage,
} from '$lib/image/index.js'

import {
  COMPONENT_LITERAL,
  Literal
} from '$lib/literal/index.js'

import {
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_DISPLAY_WRAPPED,
  renderTextDisplayWrapped,
  TextDisplay,
  TextDisplayWrapped,
} from '$lib/text-display/index.js'

import {
  COMPONENT_TEXT_INPUT,
  COMPONENT_TEXT_INPUT_WRAPPED,
  TextInput,
  TextInputWrapped,
} from '$lib/text-input/index.js'

export const defaultComponents : ComponentStoreData = {
  [COMPONENT_BUTTON]: renderButton as ComponentSnippet,
  [COMPONENT_DROPDOWN_SEARCH]: renderDropdownSearch as ComponentSnippet,
  [COMPONENT_IMAGE]: Image,
  [COMPONENT_IMAGE_WRAPPED]: renderImage as ComponentSnippet,
  [COMPONENT_LITERAL]: Literal,
  [COMPONENT_TEXT_DISPLAY]: TextDisplay,
  [COMPONENT_TEXT_DISPLAY_WRAPPED]: TextDisplayWrapped,
  [COMPONENT_TEXT_INPUT]: TextInput,
  [COMPONENT_TEXT_INPUT_WRAPPED]: TextInputWrapped,
}