export interface CheckboxSwitchProps {
    disabled?: boolean;
    getValue?: {() : boolean};
    id?: string;
    labels?: {
        false?: string,
        true?: string,
    };
    value: boolean;
}

export interface CheckboxSwitchEvents {
    click: CustomEvent<EventTarget | null>;
    valueChanged: CustomEvent<boolean>;
}

export const COMPONENT_CHECKBOX_SWITCH = 'checkbox-switch'