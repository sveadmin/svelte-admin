import {
  SvelteComponent
} from 'svelte';

import {
  Writable,
} from 'svelte/store'

export const SCREEN_TYPE_TABLE_MODAL = 'tableModal'

export const SCREEN_TYPE_MODAL = 'modal'

export const SCREEN_TYPES = [
  SCREEN_TYPE_MODAL,
  SCREEN_TYPE_TABLE_MODAL,
]

export type ScreenType = typeof SCREEN_TYPES[number]

export interface Screen {
  component: typeof SvelteComponent,
  listeners?: {[key: string] : any},
  id: string,
  parameters?: {[key: string] : any},
  type: ScreenType,
}

export interface ScreenData {
  [key: ScreenType]: Screen[]
}


export interface ScreenStoreConstructor {
  initialValue?: {
    [key: ScreenType]: Screen[]
  }
}

export interface RegisterScreen {
  component: typeof SvelteComponent
  listeners?: {[key: string] : any},
  parameters?: {[key: string] : any},
  type: ScreenType,
}

export interface ScreenStore extends Writable<ScreenData> {
  addToType: {(
    type: ScreenType,
    screen: Screen,
    addToTop: boolean
  ) : void};
  displayAll: {(parameters: RegisterScreen) : void};
  displayTop: {(parameters: RegisterScreen) : void};
  setType: {(type: ScreenType, screens: Screen[]) : void};
}