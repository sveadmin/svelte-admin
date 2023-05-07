import {
  Writable
} from 'svelte/store';

export type LoaderData = boolean

export interface LoaderStore extends Writable<LoaderData> {
}