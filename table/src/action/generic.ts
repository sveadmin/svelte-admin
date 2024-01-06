import {
  Action
} from '../types.js'

export const runGenericAction = async function(action: Action, event: Event) {
  if (event instanceof KeyboardEvent
    && event.key !== 'Enter') {
    return
  }
  
  const {
    callback,
  } = action

  await callback();
}