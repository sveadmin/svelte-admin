export interface ButtonProps {
  callback: (event : Event) => void;
  class?: string;
  getDisabledStatus: () => boolean;
  icon?: string;
  label?: string;
}

export const COMPONENT_BUTTON = 'button'