import {
  SvelteComponent
} from 'svelte';

import {
  Writable,
} from 'svelte/store'


export const SCREEN_TYPE_MODAL = 'modal'

export const SCREEN_TYPE_STATUS = 'status'

export const SCREEN_TYPE_TABLE_MODAL = 'tableModal'

export const SCREEN_TYPES = [
  SCREEN_TYPE_MODAL,
  SCREEN_TYPE_STATUS,
  SCREEN_TYPE_TABLE_MODAL,
]

export type ScreenType = typeof SCREEN_TYPES[number] | string

export interface Screen {
  components?: ScreenComponent[],
  emptyComponent?: ScreenComponent,
  fallbackType?: ScreenType,
  type?: ScreenType,
}

export interface ScreenComponent {
  component: typeof SvelteComponent,
  id?: string,
  listeners?: {[key: string] : any},
  parameters?: {[key: string] : any},
}

export interface ScreenData {
  fallbacks?: {
    [key: ScreenType]: ScreenType
  },
  screens: {
    [key: ScreenType]: Screen
  }
}

export interface ScreenStoreConstructor {
  screens?: {
    [key: ScreenType]: Screen
  }
}

export interface DisplayComponent {
  component: typeof SvelteComponent
  id?: string,
  listeners?: {[key: string] : any},
  parameters?: {[key: string] : any},
}

export interface ScreenStore extends Writable<ScreenData> {
  addComponent: {(type: ScreenType, parameters: DisplayComponent) : void};
  clearComponent: {(type: ScreenType, index?: number) : void};
  setComponent: {(type: ScreenType, parameters: DisplayComponent) : void};
  setFallbackType: {(type: ScreenType, fallbackType: ScreenType) : void}
  setType: {(type: ScreenType, screen: Screen) : void};

}