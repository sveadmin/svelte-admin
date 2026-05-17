import type {
  Snippet
} from 'svelte'

import type {
  AriaOptional,
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
  AriaOptional,
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