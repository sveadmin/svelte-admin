export { prepareApiFetch } from './api-fetch/index.js'
export {
  parseUtcDate,
} from './api-fetch/helper/index.js'
export { externalData } from './external-data/index.js'
export { i18n } from './i18n/index.js'
export { prepareJsonApi } from './json-api/index.js'
export {
  constructRelativeUrl,
  convertToJsonApi,
  encodeUriParam,
} from './json-api/helper/index.js'
export { createLoader, loader } from './loader/index.js'
export { router } from './router/index.js'
export { status } from './status/index.js'
export { getWindowScroll } from './window-scroll/index.js'

export { createFieldValidator } from './validator/index.js'
export { createValidatorMiddleware } from './validator/create-validator-middleware.js'
export {
  allowedListValidator,
  blockedListValidator,
  emailValidator,
  requiredValidator,
  validDateValidator,
} from './validator/rules/index.js'

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

export * from './api-fetch/types.js'
export * from './external-data/types.js'
export * from './i18n/types.js'
export * from './json-api/types.js'
export * from './loader/types.js'
export * from './router/types.js'
export * from './status/types.js'
export * from './validator/types.js'
export * from './window-scroll/types.js'