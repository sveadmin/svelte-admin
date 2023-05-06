export interface CheckboxSwitchProps {
    disabled?: boolean;
    falseLabel?: string;
    getValue?: {() : boolean};
    name?: string;
    trueLabel?: string;
    uniqueKey?: string;
    value: boolean;
}

export interface CheckboxSwitchEvents {
    click: EventTarget | null;
    valueChanged: CustomEvent<boolean>;
}

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'