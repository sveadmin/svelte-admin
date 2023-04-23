import {
  Subscriber,
  Unsubscriber,
  Updater,
  writable,
} from 'svelte/store'

import {
  StatusMessage,
  StatusStore,
  TYPE_NORMAL,
} from './types.js'

function instantiate() : StatusStore {
  const store = writable([])
  const {subscribe, set, update} = store
 
  const add = (parameters: StatusMessage) => {
    store.update(statuses => {
      statuses.unshift({
        message: parameters.message,
        type: parameters.type ?? TYPE_NORMAL,
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
    subscribe: (run: Subscriber<[StatusMessage]>, invalidate?: (value?: [StatusMessage]) => void) : Unsubscriber => {
      return subscribe(run, invalidate)
    },
    update: (updater: Updater<[StatusMessage]>) : void => {
      update(updater)
    }
  }
}

export const status = instantiate()