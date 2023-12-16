export const parsePagedResponse = function (response) {
  const {data, meta = {}, links = {}} = response;
  const {total: size} = meta;
  const {
    self,
    first,
    prev,
    next,
    last,
  } = links
  return {
    data,
    size,
    pager: {first, prev, self, next, last},
    meta
  };
}