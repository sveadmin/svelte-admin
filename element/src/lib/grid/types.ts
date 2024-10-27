import type {
  Snippet
} from 'svelte'

import type {
  ClassListOptional,
} from '../types.js'

export interface GridContainerProps extends ClassListOptional {
  children?: Snippet;
  span?: number;
}

export interface GridLineProps extends ClassListOptional {
  children?: Snippet;
}

export interface GridSeparatorProps extends ClassListOptional {
}