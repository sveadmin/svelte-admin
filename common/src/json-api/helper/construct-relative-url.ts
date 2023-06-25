import {
  encodeUriParam,
} from './encode-uri-param.js'

export function constructRelativeUrl (
    base: string,
    queryParams: {[key: string] : any} = {}
) {
  const query = Object.entries(queryParams)
    .reduce(encodeUriParam, [])
    .join('&');

  return [
    base,
    (query) ? '?' + query : ''
  ].join('');
}