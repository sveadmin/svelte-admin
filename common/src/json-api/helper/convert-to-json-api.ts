import {
  JsonApi,
} from '../types.js'

export function convertToJsonApi (
  data: {[key: string] : string},
  type: string,
  id: string = null
) : JsonApi {
  const jsonApiObject: JsonApi = {
    data: {
      id,
      type,
      attributes: {
        ...data
      }
    }
  }
  return jsonApiObject;
}