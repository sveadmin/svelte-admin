export interface ExternalData {
  [key: string] : string | boolean | {} | null;
}

export interface ExternalDataStore
{
  raw: ExternalData,
  get: (
    key: string,
    defaultValue?: any,
    removeKey?: boolean
  ) => any;
  has: (key: string) => boolean;
  remove: (key: string) => void;
}