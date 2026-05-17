import { mergeClasses } from './merge-classes.js'
import { mergeStyles } from './merge-styles.js'
import { wrapOnError } from './wrap-on-error.js'
import { wrapOnEvent } from './wrap-on-event.js'
import { wrapOnFocus } from './wrap-on-focus.js'
import { wrapOnInit } from './wrap-on-init.js'
import { wrapOnInput } from './wrap-on-input.js'
import { wrapOnKeyPress } from './wrap-on-key-press.js'
import { wrapOnMouseAction } from './wrap-on-mouse-action.js'

export function mergeProperties(...configurations: Array<{[key: string] : any} | undefined>) : {[key: string] : any} {
  const currentProperties : {[key: string] : any} = {}
  for (const configuration of configurations) {
    if (configuration) {
      Object.keys(configuration).map(currentKey => {
        switch (currentKey) {
          case 'class':
            currentProperties[currentKey] = mergeClasses(currentProperties[currentKey], configuration[currentKey])
            break
          case 'data':
          case 'keyMap':
            currentProperties[currentKey] = {
              ...currentProperties[currentKey],
              ...configuration[currentKey]
            }
            break
          case 'onBlur':
          case 'onChange':
            currentProperties[currentKey] = wrapOnEvent(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onError':
            currentProperties[currentKey] = wrapOnError(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onFocus':
            currentProperties[currentKey] = wrapOnFocus(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onInit':
            currentProperties[currentKey] = wrapOnInit(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onInput':
            currentProperties[currentKey] = wrapOnInput(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onKeyDown':
          case 'onKeyUp':
            currentProperties[currentKey] = wrapOnKeyPress(currentProperties[currentKey], configuration[currentKey])
            break
          case 'onMouseDown':
          case 'onMouseUp':
            currentProperties[currentKey] = wrapOnMouseAction(currentProperties[currentKey], configuration[currentKey])
            break
          case 'style':
            currentProperties[currentKey] = mergeStyles(currentProperties[currentKey], configuration[currentKey])
            break
          default:
            if (!currentProperties.hasOwnProperty(currentKey)
              || currentProperties[currentKey] === undefined) {
              currentProperties[currentKey] = configuration[currentKey]
            }
        }
      })
    }
  }

  return currentProperties
}