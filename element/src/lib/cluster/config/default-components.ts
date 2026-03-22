import type {
  ComponentStoreData,
} from '$lib/component/index.js'

import {
  COMPONENT_BUTTON,
  Button,
} from '$lib/button/index.js'

import {
  COMPONENT_IMAGE,
  COMPONENT_IMAGE_WRAPPED,
  Image,
  ImageWrapped
} from '$lib/image/index.js'

import {
  COMPONENT_LITERAL,
  Literal
} from '$lib/literal/index.js'

import {
  COMPONENT_TEXT_DISPLAY,
  COMPONENT_TEXT_DISPLAY_WRAPPED,
  TextDisplay,
  TextDisplayWrapped,
} from '$lib/text-display/index.js'

import {
  COMPONENT_TEXT_INPUT,
  COMPONENT_TEXT_INPUT_WRAPPED,
  TextInput,
  TextInputWrapped,
} from '$lib/text-input/index.js'

import {
  renderButton,
} from '../render-button.svelte'

import {
  renderImage,
} from '../render-image.svelte'

export const defaultComponents : ComponentStoreData = {
  [COMPONENT_BUTTON]: renderButton,
  [COMPONENT_IMAGE]: Image,
  [COMPONENT_IMAGE_WRAPPED]: renderImage,
  [COMPONENT_LITERAL]: Literal,
  [COMPONENT_TEXT_DISPLAY]: TextDisplay,
  [COMPONENT_TEXT_DISPLAY_WRAPPED]: TextDisplayWrapped,
  [COMPONENT_TEXT_INPUT]: TextInput,
  [COMPONENT_TEXT_INPUT_WRAPPED]: TextInputWrapped,
}