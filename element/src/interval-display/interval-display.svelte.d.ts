import { SvelteComponentTyped } from 'svelte';

export interface IntervalDisplayProps {
  isHighlighted: boolean;
  prefix: string;
  postfix: string;
  secondsDenominator: number;
  value: number;
}

export interface IntervalDisplayEvents {
    click: EventTarget;
}

export default class IntervalDisplay extends SvelteComponentTyped<IntervalDisplayProps, IntervalDisplayEvents> {}