import {
  status,
  STATUS_TYPE_ERROR,
} from '../status/index.js'

import {
  type LoaderStore,
} from '../loader/index.js'

import {
  CACHE_NO_CACHE,
  METHOD_GET,
  type ApiFetchConstructor,
  type ApiFetchParameters,
  type FetchOptions,
  type HeaderSection,
  type RequestMiddleware,
  type ParsedResponse,
  type ResponseMiddleware,
} from './types.js'

export const prepareApiFetch = (constructor: ApiFetchConstructor) : ((parameters : ApiFetchParameters) => Promise<ParsedResponse>) => {
  const {
    cache: defaultCache = CACHE_NO_CACHE,
    fetchMethod = fetch,
    headers: defaultHeaders = {},
    loader: LoaderStore,
    method: defaultMethod = METHOD_GET,
    protectedHeaders = {},
    requestMiddlewares = [],
    responseMiddlewares = [],
    url: baseUrl = '',
  } = constructor

  return async (parameters : ApiFetchParameters) : Promise<ParsedResponse> => {
    const {
      body = null,
      cache = defaultCache,
      headers = {},
      isLoaderTriggered = true,
      method = defaultMethod,
      url,
    } = parameters
    let taskKey: string
    if (loader
      && isLoaderTriggered) {
      taskKey = loader.registerTask()
    }
    const headersEvaluated = () => [
      defaultHeaders,
      headers,
      protectedHeaders
    ].reduce((aggregator: HeaderSection, headerSection: HeaderSection) => {
      Object.keys(headerSection).map(headerKey => {
        aggregator[headerKey] = (typeof headerSection[headerKey] === 'function')
          ? headerSection[headerKey]()
          : headerSection[headerKey]
      })
      return aggregator
    }, {})


    let requestOptions: FetchOptions = {
      body,
      cache,
      method,
    }

    const getResponse = async () => {
      requestOptions = requestMiddlewares.reduce(
        (aggregator: FetchOptions, requestMiddleware: RequestMiddleware) => requestMiddleware(aggregator),
        {
          ...requestOptions,
          headers: headersEvaluated(),
        }
      )

      return fetchMethod(baseUrl + url, requestOptions)
    }

    let response: Response
    try {
      response = await getResponse()
    } catch (error) {
      status.add({
        message: error,
        type: STATUS_TYPE_ERROR
      })
      return {
        baseUrl,
        requestOptions,
        response,
        text: '',
        url,
      }
    }

    if (taskKey) {
      loader.unregisterTask(taskKey)
    }

    return responseMiddlewares.reduce(
      async (aggregator: Promise<ParsedResponse>, responseMiddleware: ResponseMiddleware) => {
        return responseMiddleware(await aggregator)
      },
      Promise.resolve({
        baseUrl,
        getResponse,
        requestOptions,
        response,
        url,
      })
    )
  }
}
