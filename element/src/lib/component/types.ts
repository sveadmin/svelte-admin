import type {
  Component,
  Snippet,
} from 'svelte'

import type {
  SveadminElementConfig,
} from '$lib/types.js'

// export type ComponentSnippet = Snippet<[
//   SveadminElementConfig | undefined,
//   string[] | undefined,
// ]>

export interface ComponentWithConfig {
  component: Component,
  config?: SveadminElementConfig
}

export interface ComponentStoreData {
  [key: string] : Component | ComponentWithConfig
}

export interface ComponentStore {
  list: ComponentStoreData;
  get: (key: string) => Component | undefined;
  getConfig: (key: string) => SveadminElementConfig;
  add: (key: string, component: Component | ComponentWithConfig) => void;
}