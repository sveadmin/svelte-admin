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