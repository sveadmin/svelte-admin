import {
  loader,
} from '@sveadmin/common'

export const getReloadAction = function (action, interval) {
  return {
    label: 'Reload',
    callback: async () => {
      loader.set(true);
      await action();
      loader.set(false);
    },
    interval
  }
}