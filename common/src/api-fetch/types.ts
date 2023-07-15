import {
  LoaderStore,
} from '../loader/types.js'

export const CACHE_NO_CACHE = 'no-cache'

export const METHOD_DELETE = 'DELETE'

export const METHOD_GET = 'GET'

export const METHOD_PATCH = 'PATCH'

export const METHOD_POST = 'POST'

export const METHOD_PUT = 'PUT'

export const ALLOWED_METHODS = [
  METHOD_DELETE,
  METHOD_GET,
  METHOD_PATCH,
  METHOD_POST,
  METHOD_PUT,
]

export type Method = typeof ALLOWED_METHODS[number]

export interface HeaderSection {
  [key: string]: any | {() : any};
}

export interface ApiFetchConstructor {
  cache?: RequestCache;
  headers?: HeaderSection;
  loader?: LoaderStore;
  method?: Method;
  protectedHeaders?: HeaderSection;
  requestMiddlewares?: RequestMiddleware[];
  responseMiddlewares?: ResponseMiddleware[];
  url?: string;
}

export interface ApiFetchParameters {
  body?: {[key: string]: any};
  cache?: RequestCache;
  headers?: HeaderSection;
  isLoaderTriggered?: boolean;
  method?: Method;
  url: string;
}

export interface FetchOptions {
  body?: any;
  cache?: RequestCache;
  headers?: {[key: string]: any};
  method: Method;
}

export interface RequestMiddleware {
  (requestOptions: FetchOptions) : FetchOptions
}

export interface ParsedResponse {
  baseUrl?: string;
  data?: {[key: string]: any};
  final?: boolean;
  getResponse?: () => Promise<Response>;
  requestOptions?: FetchOptions;
  response: Response;
  text?: string;
  url?: string;
}

export interface ResponseMiddleware {
  (parsedResponse: ParsedResponse) : Promise<ParsedResponse>
}