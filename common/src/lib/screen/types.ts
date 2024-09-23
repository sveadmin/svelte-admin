import type {
  SvelteComponent
} from 'svelte';

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
  components?: DisplayComponent[],
  emptyComponent?: DisplayComponent,
  fallbackType?: ScreenType,
  type?: ScreenType,
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
  fallbacks?: {
    [key: ScreenType]: ScreenType
  },
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

export interface ScreenStore extends ScreenData {
  addComponent: {(type: ScreenType, parameters: DisplayComponent) : void};
  clearComponent: {(type: ScreenType, index?: number) : void};
  setComponent: {(type: ScreenType, parameters?: DisplayComponent) : void};
  setFallbackType: {(type: ScreenType, fallbackType: ScreenType) : void}
  setType: {(type: ScreenType, screen: Screen) : void};

}