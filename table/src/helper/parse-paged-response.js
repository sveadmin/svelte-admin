export const parsePagedResponse = function (response) {
  const {data, meta = {}, links = {}} = response;
  const {total: size} = meta;
  const {
    self,
    first: firstPage,
    prev: previousPage,
    next: nextPage,
    last: lastPage,
  } = links
  return {
    data,
    size,
    pager: {firstPage, previousPage, self, nextPage, lastPage},
    meta
  };
}