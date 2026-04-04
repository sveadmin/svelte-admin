import {
  COMPONENT,
} from '$lib/types.js'

import type {
  SveadminComponent,
  SveadminElementConfig,
} from '$lib/types.js'

import {
  propertyMerger,
} from '$lib/helper/index.js'

import {
  allowCopyPaste,
} from '../action/index.js'

import {
  INPUT_TYPE_NUMBER,
  INPUT_TYPE_TEL,
  preparePushExtraCharactersToNext,
} from '$lib/input/index.js'

export function prepareExpandChildrenConfig(
  childrenConfig?: {[key: string] : SveadminComponent<
    any,
    SveadminElementConfig | undefined,
    SveadminElementConfig | undefined
  >},
  parentConfig?: SveadminElementConfig
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

    const hardCodedConfig = {
      data: {
        index: index.toString(),
      },
      keyMap: allowCopyPaste() //Unless spreading is done the keyMap will be shared among various input instances
    }

    const optionalConfig = {
      id: parentConfig?.id + '-' + index,
      instance: {ref: undefined},
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
      currentPart.display.config = propertyMerger(
        hardCodedConfig,
        parentConfig,
        displayConfig,
      )
      // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
      currentPart.display.config.type = (currentPart.display.config.type === INPUT_TYPE_NUMBER)
        ? INPUT_TYPE_TEL
        : currentPart.display.config.type
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
      currentPart.input.config = propertyMerger(
        hardCodedConfig,
        parentConfig,
        {
          onInput: preparePushExtraCharactersToNext(inputConfig.allowedKeys, inputConfig.allowedSeparators),
        },
        inputConfig,
        optionalConfig
      )
      // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
      currentPart.input.config.type = (currentPart.input.config.type === INPUT_TYPE_NUMBER)
        ? INPUT_TYPE_TEL
        : currentPart.input.config.type
    }

    return currentPart
  }
}