import {
  Writable
} from 'svelte/store';

export interface ExternalData {
  [key: string] : string | boolean | {} | null;
}

export interface ExternalDataStore extends Writable<ExternalData> {
  has: (key: string) => boolean;
  get: (
    key: string,
    defaultValue: any,
    removeKey: boolean
  ) => any;
}