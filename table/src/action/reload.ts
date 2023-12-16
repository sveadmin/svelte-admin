import {
  loader,
} from '@sveadmin/common'

import {
  Action
} from '../types.js';

export const getReloadAction = function (action: (() => void), interval: number) : Action {
  return {
    label: 'Reload',
    callback: async () => {
      const actionKey = loader.registerTask();
      await action();
      loader.unregisterTask(actionKey);
      return true
    },
    interval
  }
}