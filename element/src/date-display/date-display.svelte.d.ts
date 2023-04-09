import { SvelteComponentTyped } from 'svelte';

export interface DateDisplayProps {
    format: string;
    value: null | Date | string;
}

export default class CheckboxSwitch extends SvelteComponentTyped<DateDisplayProps> {}