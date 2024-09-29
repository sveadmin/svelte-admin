import type { Snippet } from 'svelte'

import type {
  ClassListOptional,
  TabIndexOptional,
} from '../types.js'

export interface CollapsibleProps extends
  ClassListOptional,
  TabIndexOptional
{
  content: Snippet;
  isOpen?: boolean;
  title?: Snippet;
}

export interface CollapsibleStore {
  isOpen: boolean;
}

export const COLLAPSIBLE = 'collapsible'