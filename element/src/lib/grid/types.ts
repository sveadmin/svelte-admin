import type {
  Snippet
} from 'svelte'

import type {
  ClassListOptional,
  StyleOptional,
} from '../types.js'

export interface GridContainerProps extends
  ClassListOptional,
  StyleOptional
{
  children?: Snippet;
  span?: number;
}

export interface GridLineProps extends
  ClassListOptional,
  StyleOptional
{
  children?: Snippet;
}

export interface GridSeparatorProps extends
  ClassListOptional,
  StyleOptional
{
}