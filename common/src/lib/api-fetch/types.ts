import type {
  LoaderStore,
} from '../loader/types.js'

import type {
  StatusStore,
} from '../status/types.js'

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
  fetchMethod?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  headers?: HeaderSection;
  loader?: LoaderStore;
  method?: Method;
  protectedHeaders?: HeaderSection;
  requestMiddlewares?: RequestMiddleware[];
  responseMiddlewares?: ResponseMiddleware[];
  status?: StatusStore;
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

export interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    integrity?: string;
    keepalive?: boolean;
    signal?: AbortSignal | null;
}

export interface HeadersInit {
    [key: string]: string;
}

export type BodyInit = Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string;

export type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
export type RequestCredentials = "omit" | "same-origin" | "include";
export type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
export type RequestRedirect = "follow" | "error" | "manual";
export type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";

export interface Response {
    readonly body: ReadableStream<Uint8Array> | null;
    readonly bodyUsed: boolean;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
    json(): Promise<any>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    arrayBuffer(): Promise<ArrayBuffer>;
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