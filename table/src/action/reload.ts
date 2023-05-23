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
      loader.set(true);
      await action();
      loader.set(false);
      return true
    },
    interval
  }
}