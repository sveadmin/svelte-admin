export interface Callback {
  callback: (event : Event) => void;
}

export interface CallbackOptional {
  callback?: (event : Event) => void;
}

export interface ClassListOptional {
  classList?: string;
}

export interface IconOptional {
  icon?: string;
}

export interface IsDisabledOptional {
  isDisabled?: () => boolean;
}

export interface LabelOptional {
  label?: string;
}