import type {
  Snippet
} from 'svelte'

import type {
  ClassListOptional,
  DataOptional,
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
  DataOptional,
  StyleOptional
{
  children?: Snippet;
}

export interface GridSeparatorProps extends
  ClassListOptional,
  StyleOptional
{
}