import { isLoading } from '../../../../store/loader'

export const getReloadAction = function (action, interval) {
  return {
    label: 'Reload',
    callback: async () => {
      isLoading.set(true);
      await action();
      isLoading.set(false);
    },
    interval
  }
}