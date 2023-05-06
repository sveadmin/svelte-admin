export const getColumnAction = function () {
  return async function (callback, event) {
    await callback(event);
  }
}