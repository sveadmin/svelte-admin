import {
  Readable,
} from 'svelte/store';

export type LoaderData = boolean

export interface LoaderStore extends Readable<LoaderData> {
  registerTask: () => string;
  unregisterTask: (key: string) => void;
}