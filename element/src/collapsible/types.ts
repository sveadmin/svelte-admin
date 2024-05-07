export interface CollapsibleProps {
    isOpen?: boolean;
}

export interface CollapsibleEvents {
    click: CustomEvent<EventTarget | null>;
}

export const COLLAPSIBLE = 'collapsible'