import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  SveadminElementConfig,
} from '$lib/types.js'

export type ComponentSnippet = Snippet<[SveadminElementConfig | undefined, string[] | undefined]>

export interface ComponentStoreData {
  [key: string] : Component | ComponentSnippet
}

export interface ComponentStore {
  list: ComponentStoreData;
  get: (key: string) => Component | ComponentSnippet | undefined;
  add: (key: string, component: Component | ComponentSnippet) => void;
}