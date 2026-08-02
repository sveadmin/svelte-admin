import type { Snippet } from 'svelte'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClassListOptional,
  DataOptional,
  OnClickOptional,
  OnKeyUpOptional,
  StyleOptional,
  TabIndexOptional,
} from '../types.js'

import type {
  ImageWrappedDisplayProps,
} from '$lib/image/index.js'

export interface AccordionContentProps extends
  ClassListOptional,
  StyleOptional
{

}

export interface AccordionControlProps extends
  ImageWrappedDisplayProps
{

}

export interface AccordionHeaderProps extends
  ClassListOptional,
  OnClickOptional,
  OnKeyUpOptional,
  StyleOptional
{

}

export interface AccordionProps extends
  ClassListOptional,
  DataOptional,
  StyleOptional,
  TabIndexOptional
{
  children?: Snippet;
  childrenConfig?: {
    0?: AccordionHeaderProps,
    1?: AccordionTitleProps,
    2?: AccordionControlProps,
    3?: AccordionContentProps,
    content?: AccordionContentProps,
    control?: AccordionControlProps,
    header?: AccordionHeaderProps,
    title?: AccordionTitleProps,
  },
  content?: Snippet;
  contentClass?: string | string[];
  contentStyle?: string | string[];
  control?: Snippet<[AccordionControlProps]>;
  controlClass?: string | string[];
  controlStyle?: string | string[];
  headerClass?: string | string[];
  headerStyle?: string | string[];
  isControlRotating?: boolean;
  isOpen?: boolean | string;
  onOpen?: (event?: Event, containerFunction?: ((event: MouseEvent) => void)) => boolean;
  onClose?: (event?: Event, containerFunction?: ((event: MouseEvent) => void)) => boolean;
  open?: AccordionStore;
  title?: Snippet<[AccordionTitleProps]>| string;
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
