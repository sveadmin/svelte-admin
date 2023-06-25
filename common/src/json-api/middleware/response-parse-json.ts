import {
  ParsedResponse,
  ResponseMiddleware,
} from '../../api-fetch/types.js'

import {
  status,
} from '../../status/index.js'

import {
  STATUS_TYPE_ERROR,
} from '../../status/types.js'

export const parseJson: ResponseMiddleware = async (parsedResponse: ParsedResponse) : Promise<ParsedResponse> => {
  const contentType = parsedResponse.response.headers.get('content-type')
  if (!parsedResponse.final
    && contentType
    && contentType.indexOf('json') !== -1) {
    const body = await parsedResponse.response.json()
  // console.log('reposnes parsing', body)
    if (body.errors) {
      body.errors.map((error: {[key: string] : string}) => {
        status.add({
          message: (error.id ?? 'Unknown') + ' (' + (error.code ?? '') + ')',
          type: STATUS_TYPE_ERROR
        })
      })
    }
    parsedResponse.data = body
    parsedResponse.final = true
  }

  return parsedResponse
}