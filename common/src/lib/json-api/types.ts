import {
  ApiFetchParameters,
  ParsedResponse,
} from '../api-fetch/types.js'

export interface Api {
  delete (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
  fetch (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
  get (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
  patch (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
  post (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
  put (parameters: ApiFetchParameters) : Promise<ParsedResponse>;
}

export interface JsonApiData {
  type: string;
  id: string;
  attributes: {[key: string] : string};
}

export interface JsonApi {
  data: JsonApiData | JsonApiData[]
}