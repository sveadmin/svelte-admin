import { SvelteComponentTyped } from 'svelte';

export interface CheckboxSwitchProps {
    disabled: boolean;
    falseLabel: string;
    name: string;
    trueLabel: string;
    uniqueKey: string;
    value: boolean;
}

export interface CheckboxSwitchEvents {
    click: EventTarget | null;
    valueChanged: CustomEvent<boolean>;
}

export default class CheckboxSwitch extends SvelteComponentTyped<CheckboxSwitchProps, CheckboxSwitchEvents> {}