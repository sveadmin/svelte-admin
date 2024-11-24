import type { Snippet } from 'svelte'

import type {
  ClassListOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

export const ACCORDION = 'accordion'

export interface AccordionProps extends
  ClassListOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  content?: Snippet;
  isOpen?: boolean | string;
  open?: AccordionStore;
  title?: Snippet;
}

export interface AccordionGroupProps extends
  ClassListOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  content?: Snippet;
  openStates?: AccordionStore[];
  title?: Snippet<[boolean]>;
  titleClass?: string | string[];
  titleStyle?: string | string[];
}

export interface AccordionStore {
  isOpen: boolean;
}