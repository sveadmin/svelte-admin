export interface EventDispatcher {
  (
    type: string,
    detail?: {
      [key: string] : any
    },
    options?: {
      cancelable: boolean
    }
  ) : boolean
}

export interface FlexDefinition {
  base?: number,
  grow?: number,
  shrink?: number
}

export interface LookupTable {
  [key: string] : any;
}

export interface LookupTableFunction {
  (): LookupTable;
}

export interface TapBuffer {
  timer?: number;
  originalTarget?: HTMLElement;
  lastTouchedClientX?: number,
  lastTouchedClientY?: number,
  lastTouchedTarget?: HTMLElement
}