import type {
  Component,
  Snippet,
} from 'svelte'

export interface ComponentStoreData {
  [key: string] : Component | Snippet
}

export interface ComponentStore {
  list: ComponentStoreData;
  get: (key: string) => Component | Snippet | undefined;
  add: (key: string, component: Component | Snippet) => void;
}