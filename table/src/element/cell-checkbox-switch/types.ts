export interface CellCheckboxSwitchEvents {
  click: EventTarget | null;
  valueChanged: CustomEvent<boolean>;
}