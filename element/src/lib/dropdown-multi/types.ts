export type LookupItem = {
  term: string,
  display: string
};

export type SelectedItems = {[key: string]: boolean}

export type SelectionItem = {
  id: string,
  value: string
};

export interface SelectionGetter {
  (): {[key: string]: boolean}
}

export interface ValueGetter {
  (): SelectionItem[]
}

export interface DropdownMultiProps {
  getSelection: SelectionGetter;
  getValues: ValueGetter;
  values: SelectionItem[];
}

export interface DropdownMultiEvents {
    submit: CustomEvent<SelectedItems>;
}

export const COMPONENT_DROPDPWN_MULTI = 'dropdown-multi'