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
export {
  SCREEN_TYPE_TABLE_MODAL,
  SCREEN_TYPE_MODAL,
  SCREEN_TYPES,
} from './screen/types.js'
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

export type * from './api-fetch/types.js'
export type * from './external-data/types.js'
export type * from './i18n/types.js'
export type * from './json-api/types.js'
export type * from './loader/types.js'
export type * from './router/types.js'
export type * from './screen/types.js'
export type * from './status/types.js'
export type * from './validator/types.js'
export type * from './window-scroll/types.js'