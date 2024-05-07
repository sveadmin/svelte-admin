import { SvelteComponentTyped } from 'svelte';
import {
  CollapsibleEvents,
  CollapsibleProps,
} from './types.js'

export default class Collapsible extends SvelteComponentTyped<CollapsibleProps, CollapsibleEvents> {}

export type CollapsibleComponent = typeof Collapsible & SvelteComponentTyped<CollapsibleProps, CollapsibleEvents>