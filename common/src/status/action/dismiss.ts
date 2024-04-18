import {
  Writable,
} from 'svelte/store'

import {
  StatusMessage,
} from '../types.js'

export function prepareDismiss(store: Writable<StatusMessage[]>) {
  const { update } = store
  return (id: number) => {
    update((statuses: StatusMessage[]) => {
      const toUpdate = statuses.find(value => value.id == id);
      toUpdate.dismissed = true;
      return statuses;
    }) 
  }
}