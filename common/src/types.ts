export interface LookupTable {
  [key: string] : any;
}

export interface LookupTableFunction {
  (): LookupTable;
}