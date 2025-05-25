export * from './api-fetch/index.js'
export * from './external-data/index.js'
export * from './i18n/index.js'
export * from './json-api/index.js'
export * from './loader/index.js'
export * from './noop/index.js'
export * from './router/index.js'
export * from './rune/index.js'
export * from './screen/index.js'
export * from './status/index.js'
export * from './validator/index.js'
export * from './window-scroll/index.js'

export interface EventDispatcher {
  (
    type: string,
    detail: {
      [key: string] : any
    },
    options: {
      cancelable: boolean
    }
  ) : boolean
}

export interface LookupTable {
  [key: string] : any;
}

export interface LookupTableFunction {
  (): LookupTable;
}