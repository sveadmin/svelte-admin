import {
  writable,
  Writable,
} from 'svelte/store'

import {
  StatusMessage,
  StatusStore,
  STATUS_TYPE_NORMAL,
} from './types.js'

function instantiate() : StatusStore {
  const store: Writable<StatusMessage[]> = writable([])
  const {subscribe, set, update} = store
 
  const add = (parameters: StatusMessage) => {
    store.update(statuses => {
      statuses.unshift({
        message: parameters.message,
        type: parameters.type ?? STATUS_TYPE_NORMAL,
        dismissed: false,
        id: statuses.length,
        time: new Date(),
      })
      return statuses;
    })
  }

  const dismiss = (id: number) => {
    store.update(statuses => {
      const toUpdate = statuses.find(value => value.id == id);
      toUpdate.dismissed = true;
      return statuses;
    }) 
  }

  return {
    add,
    dismiss,
    set,
    subscribe,
    update
  }
}

export const status = instantiate()