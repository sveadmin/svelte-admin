import {
  FetchOptions,
  RequestMiddleware,
} from '../../api-fetch/types.js'

export const jsonEncodeBody: RequestMiddleware = (requestOptions: FetchOptions) : FetchOptions => {
  requestOptions.body = (requestOptions.body)
    ? JSON.stringify(requestOptions.body)
    : null

  return requestOptions
}