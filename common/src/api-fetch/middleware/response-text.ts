import {
  ParsedResponse,
  ResponseMiddleware,
} from '../../api-fetch/types.js'

export const text: ResponseMiddleware = async (parsedResponse: ParsedResponse) : Promise<ParsedResponse> => {
  if (!parsedResponse.final) {
    parsedResponse.final = true
    parsedResponse.text = await parsedResponse.response.text()
  }

  return parsedResponse
}