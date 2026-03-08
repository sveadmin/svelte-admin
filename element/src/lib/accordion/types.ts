import type { Snippet } from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  OnClickOptional,
  OnKeyUpOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

export interface AccordionContentProps extends
  ClassListOptional,
  StyleOptional
{

}

export interface AccordionControlProps extends
  ClassListOptional,
  StyleOptional
{

}

export interface AccordionProps extends
  ClassListOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  childrenConfig?: {
    0?: AccordionTitleProps,
    1?: AccordionControlProps,
    2?: AccordionContentProps,
    content?: AccordionContentProps,
    control?: AccordionControlProps,
    title?: AccordionTitleProps,
  },
  content?: Snippet;
  contentClass?: string | string[];
  contentStyle?: string | string[];
  controlClass?: string | string[];
  controlStyle?: string | string[];
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

export interface AccordionTitleProps extends
  ClassListOptional,
  OnClickOptional,
  OnKeyUpOptional,
  StyleOptional
{

}
