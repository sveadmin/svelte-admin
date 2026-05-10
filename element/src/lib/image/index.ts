import {
  defaultComponents,
} from '$lib/component/index.js'

import Image from './image.svelte'
import ImageMap from './image-map.svelte'
import ImageWrapped from './image-wrapped.svelte'

import {
  COMPONENT_IMAGE,
  COMPONENT_IMAGE_WRAPPED,
} from './types.js'

export {
  Image,
  ImageMap,
  ImageWrapped,
}

export * from './types.js'

defaultComponents.add(
  COMPONENT_IMAGE,
  Image
)

defaultComponents.add(
  COMPONENT_IMAGE_WRAPPED,
  {
    component: ImageWrapped,
    config: {
      isOutlineVisible: true,
      style: "vertical-align:top",
      visibleHeight: "1.15em",
      visibleWidth: "1.125em",
    }
  }
)