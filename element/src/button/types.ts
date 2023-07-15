export interface ButtonProps {
  callback: (event : Event) => void;
  icon?: string;
  label?: string;
}

export const COMPONENT_BUTTON = 'button'