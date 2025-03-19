import type { Snippet } from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

export const ACCORDION = 'accordion'

export interface AccordionProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  content?: Snippet;
  isOpen?: boolean | string;
  open?: AccordionStore;
  title?: Snippet;
  titleClass?: string | string[];
  titleStyle?: string | string[];
}

export interface AccordionGroupProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  content?: Snippet;
  openStates?: AccordionStore[];
  title?: Snippet<[boolean, (e: Event) => void]>;
  titleClass?: string | string[];
  titleStyle?: string | string[];
}

export interface AccordionStore {
  isOpen: boolean;
}