import {
  type StatusData,
  type StatusMessage,
} from '../types.js'

export function prepareDismiss(store: StatusData) {
  return (id: number) => {
    const toUpdate: StatusMessage | undefined = store.messages.find(value => value.id == id);
    if (!toUpdate) {
      return
    }
    toUpdate.dismissed = true
  }
}