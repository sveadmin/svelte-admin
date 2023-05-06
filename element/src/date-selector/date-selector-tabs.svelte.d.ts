import { SvelteComponentTyped } from 'svelte';
import {
  DateSelectorTabsProps,
} from './types.js'

export default class DateSelectorTabs extends SvelteComponentTyped<DateSelectorTabsProps> {}

export type DateSelectorTabsComponent = typeof DateSelectorTabs & SvelteComponentTyped<DateSelectorTabsProps>