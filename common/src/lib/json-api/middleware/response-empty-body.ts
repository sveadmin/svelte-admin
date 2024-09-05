import {
  ParsedResponse,
  ResponseMiddleware,
} from '../../api-fetch/types.js'

export const emptyBody: ResponseMiddleware = async (parsedResponse: ParsedResponse) : Promise<ParsedResponse> => {
  if (!parsedResponse.final
    && parsedResponse.response.status === 204) {
    parsedResponse.final = true
    parsedResponse.text = ''
  }

  return parsedResponse
}