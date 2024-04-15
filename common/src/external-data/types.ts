import {
  Writable
} from 'svelte/store';

export interface ExternalData {
  [key: string] : string | boolean | {} | null;
}

export interface ExternalDataStore extends Writable<ExternalData>
{
  getKey: (
    key: string,
    defaultValue?: any,
    removeKey?: boolean
  ) => any;
  has: (key: string) => boolean;
  remove: (key: string) =>void;
}