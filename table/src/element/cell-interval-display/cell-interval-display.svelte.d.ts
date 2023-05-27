import { SvelteComponentTyped } from 'svelte';
import {
  CellIntervalDisplayEvents,
  CellIntervalDisplayProps,
} from './types.js'


export default class CellIntervalDisplay extends SvelteComponentTyped<CellIntervalDisplayProps, CellIntervalDisplayEvents> {}

export type CellIntervalDisplayComponent = typeof CellIntervalDisplay & SvelteComponentTyped<CellIntervalDisplayProps, CellIntervalDisplayEvents>