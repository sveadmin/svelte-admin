import { isLoading } from '../../../../store/loader';

export const getChangePageAction = function (callback) {
  return async () => {
    isLoading.set(true);
    await callback();
    isLoading.set(false);
  }
}