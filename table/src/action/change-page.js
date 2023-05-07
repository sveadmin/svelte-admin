import {
  loader,
} from '@sveadmin/common'

export const getChangePageAction = function (callback) {
  return async () => {
    loader.set(true);
    await callback();
    loader.set(false);
  }
}