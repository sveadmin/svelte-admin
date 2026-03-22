import {
  COMPONENT,
} from '$lib/types.js'

import type {
  SveadminComponent,
  SveadminElementConfig,
} from '$lib/types.js'

import {
  propertyMerger,
} from '$lib/helper/property-merger.js'

export function prepareExpandChildrenConfig(
  childrenConfig?: {[key: string] : SveadminComponent<
    any,
    SveadminElementConfig | undefined,
    SveadminElementConfig | undefined
  >}
): (
    currentPart: SveadminComponent<any>,
    index: number
  ) => SveadminComponent<any>
{
  return (
    currentPart: SveadminComponent<any>,
    index: number
  ) : SveadminComponent<any> => {
    const namedConfig = (currentPart?.name) ? childrenConfig?.[currentPart?.name] : undefined
    const indexedConfig = childrenConfig?.[index]
    if (currentPart.type === COMPONENT
        && (namedConfig
          || indexedConfig)
    ) {
      currentPart.type = namedConfig?.type
        ?? namedConfig?.display?.type
        ?? namedConfig?.input?.type
        ?? indexedConfig?.type
        ?? indexedConfig?.display?.type
        ?? indexedConfig?.input?.type
        ?? currentPart.type
    }

    const displayType = namedConfig?.display?.type
      ?? indexedConfig?.display?.type

    if (displayType) {
      currentPart.display = currentPart?.display ?? {}
      currentPart.display.type = displayType
    }

    const displayConfig = propertyMerger(
      currentPart?.display?.config,
      namedConfig?.display?.config,
      indexedConfig?.display?.config,
    )

    if (Object.keys(displayConfig).length > 0) {
      currentPart.display = currentPart?.display ?? {}
      currentPart.display.config = displayConfig
    }

    const inputType = namedConfig?.input?.type
      ?? indexedConfig?.input?.type

    if (inputType) {
      currentPart.input = currentPart?.input ?? {}
      currentPart.input.type = inputType
    }

    const inputConfig = propertyMerger(
      currentPart?.input?.config,
      namedConfig?.input?.config,
      indexedConfig?.input?.config,
    )

    if (Object.keys(inputConfig).length > 0) {
      currentPart.input = currentPart?.input ?? {}
      currentPart.input.config = inputConfig
    }

    return currentPart
  }
}