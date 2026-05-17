import type {
  Component,
} from 'svelte'

import {
  COMPONENT,
  TEXT_INPUT_TYPE_NUMBER,
  TEXT_INPUT_TYPE_TEL,
} from '$lib/types.js'

import type {
  SveadminComponent,
  SveadminElementConfig,
} from '$lib/types.js'

import {
  mergeProperties,
} from '$lib/helper/index.js'

import {
  allowCopyPaste,
} from '../action/index.js'

import {
  preparePushExtraCharactersToNext,
} from '$lib/input/index.js'

export function prepareExpandChildrenConfig(
  childrenConfig?: SveadminElementConfig | undefined,
  componentConfig?: {[key: string] : SveadminComponent<
    any,
    Component | undefined,
    SveadminElementConfig | undefined,
    SveadminElementConfig | undefined
  > | undefined},
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
    const namedComponent = (currentPart?.name) ? componentConfig?.[currentPart?.name] : undefined
    const indexedComponent = componentConfig?.[index]
    if (currentPart.type === COMPONENT
        && (namedComponent
          || indexedComponent)
    ) {
      currentPart.type = namedComponent?.type
        ?? namedComponent?.display?.type
        ?? namedComponent?.input?.type
        ?? indexedComponent?.type
        ?? indexedComponent?.display?.type
        ?? indexedComponent?.input?.type
        ?? currentPart.type
    }

    const hardCodedConfig = {
      data: {
        index: index.toString(),
      },
      id: parentConfig?.id + '-' + index,
      keyMap: allowCopyPaste() //Unless spreading is done the keyMap will be shared among various input instances
    }

    const displayType = namedComponent?.display?.type
      ?? indexedComponent?.display?.type

    if (displayType) {
      currentPart.display = currentPart?.display ?? {}
      currentPart.display.type = displayType
    }

    const displayConfig = mergeProperties(
      currentPart?.display?.config,
      namedComponent?.display?.config,
      indexedComponent?.display?.config,
    )

    if (Object.keys(displayConfig).length > 0) {
      currentPart.display = currentPart?.display ?? {}
      currentPart.display.config = mergeProperties(
        hardCodedConfig,
        parentConfig,
        displayConfig,
      )
      // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
      currentPart.display.config.type = (currentPart.display.config.type === TEXT_INPUT_TYPE_NUMBER)
        ? TEXT_INPUT_TYPE_TEL
        : currentPart.display.config.type
    }

    const inputType = namedComponent?.input?.type
      ?? indexedComponent?.input?.type

    if (inputType) {
      currentPart.input = currentPart?.input ?? {}
      currentPart.input.type = inputType
    }

    const inputConfig = mergeProperties(
      currentPart?.input?.config,
      namedComponent?.input?.config,
      indexedComponent?.input?.config,
    )

    if (Object.keys(inputConfig).length > 0) {
      currentPart.input = currentPart?.input ?? {}
      currentPart.input.config = mergeProperties(
        namedConfig,
        indexedConfig,
        hardCodedConfig,
        parentConfig,
        {
          onInput: preparePushExtraCharactersToNext(inputConfig.allowedKeys, inputConfig.allowedSeparators),
        },
        inputConfig,
      )
      // This is needed as type=number does not expose selectionStart and selectionEnd properties required for input cluster functionality
      currentPart.input.config.type = (currentPart.input.config.type === TEXT_INPUT_TYPE_NUMBER)
        ? TEXT_INPUT_TYPE_TEL
        : currentPart.input.config.type
    }

    return currentPart
  }
}