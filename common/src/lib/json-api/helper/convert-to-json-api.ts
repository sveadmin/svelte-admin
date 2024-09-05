import {
  JsonApi,
} from '../types.js'

export function convertToJsonApi (
  data: {[key: string] : string},
  type: string,
  id: string | {(data: {[key: string] : string}) : string} = data => data.id
) : JsonApi {
  const idEvaluated : string = (typeof id === 'function')
    ? id(data)
    : id
  const jsonApiObject: JsonApi = {
    data: {
      id: idEvaluated,
      type,
      attributes: {
        ...data
      }
    }
  }
  return jsonApiObject;
}