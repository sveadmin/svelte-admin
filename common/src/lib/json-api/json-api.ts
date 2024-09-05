import {
  prepareApiFetch,
} from '../api-fetch/index.js'

import {
  ApiFetchConstructor,
  ApiFetchParameters,
  METHOD_DELETE,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_PUT,
  ParsedResponse,
} from '../api-fetch/types.js'

import {
  emptyBody,
  jsonEncodeBody,
  parseJson,
} from './middleware/index.js'

import {
  Api,
} from './types.js'

export function prepareJsonApi(parameters: ApiFetchConstructor) : Api {
  const {
    requestMiddlewares = [],
    responseMiddlewares = [],
  } = parameters
  parameters.requestMiddlewares = [
    ...requestMiddlewares,
    jsonEncodeBody,
  ]

  parameters.responseMiddlewares = [
    ...responseMiddlewares,
    emptyBody,
    parseJson,
  ]

  const apiFetch = prepareApiFetch(parameters)

  return {
    delete: async function (parameters: ApiFetchParameters): Promise<ParsedResponse> {
      return apiFetch({
        ...parameters,
        method: METHOD_DELETE
      })
    },
    fetch: apiFetch,
    get: async function (parameters: ApiFetchParameters): Promise<ParsedResponse> {
      return apiFetch({
        ...parameters,
        method: METHOD_GET
      })
    },
    patch: async function (parameters: ApiFetchParameters): Promise<ParsedResponse> {
      return apiFetch({
        ...parameters,
        method: METHOD_PATCH
      })
    },
    post: async function (parameters: ApiFetchParameters): Promise<ParsedResponse> {
      return apiFetch({
        ...parameters,
        method: METHOD_POST
      })
    },
    put: async function (parameters: ApiFetchParameters): Promise<ParsedResponse> {
      return apiFetch({
        ...parameters,
        method: METHOD_PUT
      })
    },
  }
}