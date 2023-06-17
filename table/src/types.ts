import {
  SvelteComponent
} from 'svelte';

import {
  Writable,
} from 'svelte/store'

import {
  LoaderStore,
  ValidatorStore,
} from '@sveadmin/common'

import type {
  ALLOWED_COMPONENTS,
  AllowedDropdownDisplayMode,
  AllowedImageDisplayMode,
  AllowedIntervalDisplayMode,
  AllowedJsonDisplayMode,
  Component,
  Option,
  SelectionItem,
  ValueGetter,
} from '@sveadmin/element'

import { COMPONENT_TEXT_LOOKUP } from './element/cell-text-lookup/types.js'

export {
  COMPONENT_TEXT_LOOKUP,
}

export interface Action {
  icon?: string;
  interval?: number;
  isActive?: (rowAttributes: RowAttributes) => boolean | Promise<boolean>;
  label: string;
  // metaField?: string;
  callback: (rowAttributes: RowAttributes) => boolean | Promise<boolean>;
  failCallback?: (rowAttributes: RowAttributes) => void | Promise<void>;
  finalCallback?: () => void | Promise<void>;
  successCallback?: (rowAttributes: RowAttributes) => void | Promise<void>;
}

export interface ActionsForColumn {
  buttons?: ActionMatrix;
  editor?: EditorActionParameters,
}

export const ACTION_QUARTER_BOTTOM = 'bottom'

export const ACTION_QUARTER_LEFT = 'left'

export const ACTION_QUARTER_RIGHT = 'right'

export const ACTION_QUARTER_TOP = 'top'

export const ALLOWED_ACTION_QUARTERS = [ //This is the reverse order of how the buttons are autofilled
  ACTION_QUARTER_TOP,
  ACTION_QUARTER_BOTTOM,
  ACTION_QUARTER_LEFT,
  ACTION_QUARTER_RIGHT,
]

export type ActionQuarter = typeof ALLOWED_ACTION_QUARTERS[number]

export interface ActionMatrix {
  [key: number] : {
    [key: number] : Action
  }
}

export interface ActionMatrixDescriptor {
  section: ActionQuarter,
  x: number,
  y: number
}

export type ActionMatrixMap = ActionMatrixDescriptor[]

export interface ActionStoreConstructor {
  generic?: Action[];
  row?: Action[];
  column?: {
    [key: string]: ActionsForColumn
  };
}

export interface ActionData {
  generic?: Action[];
  row?: Action[];
  column?: {
    [key: string]: ActionsForColumn
  }
  visibleColumnActions?: {
    buttons: ActionMatrix;
    x: number;
    y: number;
  }
}

export interface ActionStore extends Writable<ActionData> {
  addColumnButton: (
    action: Action,
    column: string,
    quarter?: ActionQuarter
  ) => void;
  addGeneric: (action: Action) => void;
  addRow: (action: Action) => void;
  getEditor: (column: string) => EditorActionParameters | null;
  hideColumnActions: () => void;
  setEditor: (column: string, editor: EditorActionParameters) => void;
  showColumnActions : (
    buttons: ActionMatrix,
    x: number,
    y: number,
  ) => void;
}

export const ALLOWED_CELL_COMPONENTS = [
  COMPONENT_TEXT_LOOKUP,
]

export type CellComponent = typeof ALLOWED_CELL_COMPONENTS[number] | typeof ALLOWED_COMPONENTS[number]

export interface CellComponentProps {
  column: string;
  contextKey: TableContextKey;
  rowIndex: number;
  value: string;
}

export interface ComponentCondition {
  (rowAttributes: RowAttributes, originalAttributes: RowAttributes) : boolean;
}

export interface ComponentConditionSetting {
  condition: ComponentCondition,
  component: CellComponent,
}

export interface ComponentConstructor {
  (
    column: string,
    contextKey: TableContextKey,
    rowIndex: number
  ) : ((value: any) => typeof SvelteComponent)
}

export interface ComponentElementStore extends Writable<CellComponent> {
}

export interface ComponentStoreConstructor {
  initialValue?: {[key: RowKey] : CellComponent[]}
}

export type ComponentData = {[key: RowKey] : ComponentElementStore[]}

export interface ComponentStore extends Writable<ComponentData> {
  exists: {(columnIndex: number, rowId: RowKey) : boolean};
  getByIndex: {(columnIndex: number, rowId: RowKey) : ComponentElementStore | null};
  setByIndex: {(
    columnIndex: number,
    rowId: RowKey,
    component: CellComponent
  ) : void};
}

export interface DataStoreConstructor {
  initialValue?: Row[];
}

export type DataData = Row[]

export interface DataStore extends Writable<DataData> {
  getRow: {(rowIndex: number) : Row | null};
  getRowAttributes: {(rowIndex: number) : RowAttributes | null};
  getRowProperty: {(rowIndex: number, property: string) : any};
  updateIfChanged: {(updater: (currentValue: DataData) => DataData) : boolean};
}

export interface EditorActionParameters {
  componentOptions?: {
    [key: string] : any;
  },
  condition?: ((RowAttributes: RowAttributes, originalAttributes: RowAttributes) => boolean);
  inline?: CellComponent;
  screen?: {
    component: typeof SvelteComponent,
    screen: ScreenType;
  }
}

export interface Filter {
  [key: string] : any;
}

export interface FilterStoreConstructor {
  initialValue?: Filter;
}

export interface FilterData {
  [key: string] : any;
}

export interface FilterActionParameters {
  callback?: ((event: CustomEvent<any>) => void);
  component: typeof SvelteComponent;
  contextKey: TableContextKey,
  field: string;
  getSelection?: (() => any);
}

export interface FilterDateRange {
  after: Date;
  before: Date;
}

export interface FilterDateRangeParameters {
  callback?: ((event: CustomEvent<any>) => void);
  contextKey: TableContextKey;
  field: string;
  finalCallback?: (() => void);
  getSelection?: (() => any);
}

export interface FilterDropdownMultiParameters {
  callback: ((event: CustomEvent<any>) => void);
  contextKey: TableContextKey;
  field: string;
  finalCallback?: (() => void);
  getSelection?: (() => any);
  getValues?: ValueGetter;
  values?: SelectionItem[];
}

export interface FilterFloatingInputParameters {
  callback?: ((event: CustomEvent<any>) => void);
  contextKey: TableContextKey;
  field: string;
  finalCallback?: (() => void);
  getSelection?: (() => any);
}

export interface FilterStore extends Writable<FilterData> {
  add: {(key: string, value: any) : void};
  has: {(key: string) : boolean};
  get: {(key: string) : any};
  remove: {(key: string) : void};
}

export type FloatEvent = CustomEvent<{isFloating: boolean}>

export interface GetKey {
  (rowAttributes: RowAttributes) : RowKey;
}

export const MAX_ROWS_PER_PAGE = 1000

export interface Meta {
  [key: string] : any;
}

export interface MetaStoreConstructor {
  initialValue?: Meta;
}

export interface MetaData {
  [key: string] : any;
}

export interface MetaStore extends Writable<MetaData> {
  updateAttribute: {(key: string, value: any) : void};
  updateAttributes: {(attributes: MetaData) : void};
}

export interface NewActionParameters {
  callback?: ((event: CustomEvent<any>) => void);
  component: typeof SvelteComponent;
  contextKey: TableContextKey,
  field: string;
  getSelection?: (() => any);
}

export interface OriginalDataData {
  [key: string] : RowAttributes;
}

export interface OriginalDataStore extends Writable<OriginalDataData> {
}

export interface PageDetailData {
  size: number;
  limit: number;
  offset: number;
}

export interface PageDetailStoreConstructor {
  size?: number;
  limit?: number;
  offset?: number;
}

export interface PageDetailStore extends Writable<PageDetailData> {
  setLimit: {(size: number) : void};
  setOffset: {(size: number) : void};
  setSize: {(size: number) : void};
}

export interface PagerData {
  firstPage?: string;
  lastPage?: string;
  nextPage?: string;
  previousPage?: string;
}

export interface PagerStore extends Writable<PagerData> {
}

export interface RepeatedColumn {
  groupdId: string;
  key: string;
  label: string;
}

export interface RowAttributes {
  [key: string] : any;
}

export interface Row {
  id: string;
  type: string;
  attributes: RowAttributes;
}

export type RowKey = string | number

export type RowKeyData = RowKey[]

export interface RowKeyStore extends Writable<RowKeyData> {
}

export const ROW_META_DIRTY = 'dirty'

export const ROW_META_SAVING = 'saving'

export const ROW_META_SELECTED = 'selected'

export const ROW_META_STATUS = 'status'

export interface RowMeta {
  dirty?: boolean;
  saving?: boolean;
  selected?: boolean;
  status?: boolean;
}

export interface RowMetaData {
  [key: RowKey] : RowMeta
}

export interface RowMetaStoreConstructor {
  initialValue?: {[key: RowKey] : RowMeta};
}

export interface RowMetaStore extends Writable<RowMetaData> {
  has: {(rowId: RowKey) : boolean};
  updateProperty: {(
    rowId: RowKey,
    key: string,
    value: any
  ) : void};
}

export interface RowSelectionData {
  allChecked?: boolean;
  partiallyChecked?: boolean;
  selectionCount?: number;
}

export interface RowSelectionStore extends Writable<RowSelectionData> {
}

export interface SaveActionParameters {
  action: ((row: Row) => boolean);
  contextKey: TableContextKey,
  errorCallback?: ((row: Row) => boolean);
  finalCallback?: (() => void);
  successCallback?: ((row: Row) => boolean);
}

export type SavedSelectionData = RowKey[] //List of rowIds selected, this is based on key, not the visible index

export interface SavedSelectionStoreConstructor {
  initialValue?: RowKey[];
}

export interface SavedSelectionStore extends Writable<SavedSelectionData> {
}

export const SCREEN_ID_TABLE_MODAL = 'tableModal'

export const SCREEN_TYPE_MODAL = 'modal'

export const SCREEN_TYPES = [
  SCREEN_TYPE_MODAL,
]

export type ScreenType = typeof SCREEN_TYPES[number]

export interface Screen {
  component: typeof SvelteComponent,
  id: string,
  type: ScreenType,
}

export interface ScreenData {
  [key: ScreenType]: Screen[]
}


export interface ScreenStoreConstructor {
  initialValue?: {
    [key: ScreenType]: Screen[]
  }
}

export interface ScreenStore extends Writable<ScreenData> {
  addToType: {(
    type: ScreenType,
    screen: Screen,
    addToTop: boolean
  ) : void};
  displayAll: {(type: ScreenType, component: typeof SvelteComponent) : void};
  displayTop: {(type: ScreenType, component: typeof SvelteComponent) : void};
  setType: {(type: ScreenType, screens: Screen[]) : void};
}

export interface SelectionData {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  anchorBaseColumn?: number;
  anchorBaseRow?: number;
  anchorTipColumn?: number;
  anchorTipRow?: number;
}

export interface SelectionStore extends Writable<SelectionData> {
  clearAnchor: {() : void};
  isInside: {(column: number, row: number) : boolean};
  setAnchorBase: {(colmnIndex: number, rowIndex: number) : void};
  setAnchorTip: {(colmnIndex: number, rowIndex: number) : void};
  setLeftTop: {(left: number, top: number) : void};
  setRightBottom: {(right: number, bottom: number) : void};
}

export interface SelectionUpdateParameter {
  columnIndex: number,
  rowIndex: number,
  forceAnchor?: boolean,
  forceTip?: boolean,
}

export const SETTING_ACTIONS = 'actions'

export const SETTING_ALIGN = 'align'

export const SETTING_ARE_HELPERS_VISIBLE = 'areHelpersVisible'

export const SETTING_BASE = 'base'

export const SETTING_CALLBACK = 'callback'

export const SETTING_CLEAR_VALUE_ON_INIT = 'clearValueOnInit'

export const SETTING_COLUMN_VISIBLE = 'columnVisible'

export const SETTING_DECIMALS = 'decimals'

export const SETTING_DEFAULT_LOCALE = 'defaultLocale'

export const SETTING_DIGITS = 'digits'

export const SETTING_DISABLED = 'disabled'

export const SETTING_DISPLAY_MODE = 'displayMode'

export const SETTING_DISPLAY_NAME = 'displayName'

export const SETTING_FIELD = 'field'

export const SETTING_FIELDS = 'fields'

export const SETTING_FLIP_HELPERS = 'flipHelpers'

export const SETTING_FOCUSED = 'focused'

export const SETTING_FORMAT = 'format'

export const SETTING_GET_DISPLAY_NAME = 'getDisplayName'

export const SETTING_GET_PARAMETERS = 'getParameters'

export const SETTING_GET_VALUE = 'getValue'

export const SETTING_GET_VALUES = 'getValues'

export const SETTING_GROW = 'grow'

export const SETTING_ICON = 'icon'

export const SETTING_ID = 'id'

export const SETTING_IS_EMPTY_ALLOWED = 'isEmptyAllowed'

export const SETTING_IS_HIGHLIGHTED = 'isHighlighted'

export const SETTING_IS_NEW_VALUE_ALLOWED = 'isNewValueAllowed'

export const SETTING_LENGTH = 'length'

export const SETTING_LOCALES = 'locales'

export const SETTING_MAX = 'max'

export const SETTING_ON_CLICK = 'onClick'

export const SETTING_ORDER = 'order'

export const SETTING_PARAMETERS = 'parameters'

export const SETTING_PREFIX = 'prefix'

export const SETTING_PRIVILEGES = 'privileges'

export const SETTING_POSTFIX = 'postfix'

export const SETTING_READ_ONLY = 'readOnly'

export const SETTING_REFRESH_AT = 'refreshAt'

export const SETTING_REPEATED_COLUMNS = 'repeatedColumns'

export const SETTING_ROUTE = 'route'

export const SETTING_SAVE_ON_BLUR = 'saveOnBlur'

export const SETTING_SECONDS_DENOMINATOR = 'secondsDenominator'

export const SETTING_SHRINK = 'shrink'

export const SETTING_THOUSAND_SEPARATOR = 'thousandSeparator'

export const SETTING_TYPE = 'type'

export const SETTING_VALIDATOR = 'validator'

export const SETTING_VALUES = 'values'

export const SETTING_VALUES_COLLECTION = 'valueCollection'

export const SETTINGS = [
  SETTING_ARE_HELPERS_VISIBLE,
  SETTING_ACTIONS,
  SETTING_ALIGN,
  SETTING_BASE,
  SETTING_CALLBACK,
  SETTING_CLEAR_VALUE_ON_INIT,
  SETTING_COLUMN_VISIBLE,
  SETTING_DECIMALS,
  SETTING_DEFAULT_LOCALE,
  SETTING_DIGITS,
  SETTING_DISABLED,
  SETTING_DISPLAY_MODE,
  SETTING_DISPLAY_NAME,
  SETTING_FIELD,
  SETTING_FIELDS,
  SETTING_FLIP_HELPERS,
  SETTING_FOCUSED,
  SETTING_FORMAT,
  SETTING_GET_DISPLAY_NAME,
  SETTING_GET_PARAMETERS,
  SETTING_GET_VALUE,
  SETTING_GET_VALUES,
  SETTING_GROW,
  SETTING_ICON,
  SETTING_ID,
  SETTING_IS_EMPTY_ALLOWED,
  SETTING_IS_HIGHLIGHTED,
  SETTING_IS_NEW_VALUE_ALLOWED,
  SETTING_LENGTH,
  SETTING_LOCALES,
  SETTING_MAX,
  SETTING_ON_CLICK,
  SETTING_ORDER,
  SETTING_PARAMETERS,
  SETTING_PREFIX,
  SETTING_PRIVILEGES,
  SETTING_POSTFIX,
  SETTING_READ_ONLY,
  SETTING_REFRESH_AT,
  SETTING_REPEATED_COLUMNS,
  SETTING_ROUTE,
  SETTING_SAVE_ON_BLUR,
  SETTING_SECONDS_DENOMINATOR,
  SETTING_SHRINK,
  SETTING_THOUSAND_SEPARATOR,
  SETTING_TYPE,
  SETTING_VALIDATOR,
  SETTING_VALUES,
  SETTING_VALUES_COLLECTION,
]

export type Settings = typeof SETTINGS[number]

export interface SettingsList {
  [SETTING_ARE_HELPERS_VISIBLE]?: boolean;
  [SETTING_BASE]?: number;
  [SETTING_CALLBACK]?: ((attributes: RowAttributes) => void);
  [SETTING_CLEAR_VALUE_ON_INIT]?: boolean;
  [SETTING_COLUMN_VISIBLE]?: boolean;
  [SETTING_DECIMALS]?: number;
  [SETTING_DIGITS]?: number;
  [SETTING_DISABLED]?: boolean;
  [SETTING_DISPLAY_MODE]?:
    AllowedDropdownDisplayMode
    | AllowedImageDisplayMode
    | AllowedIntervalDisplayMode
    | AllowedJsonDisplayMode;
  [SETTING_DISPLAY_NAME]?: string;
  [SETTING_FIELD]: string;
  [SETTING_FIELDS]?: string[];
  [SETTING_FLIP_HELPERS]?: boolean;
  [SETTING_FOCUSED]?: boolean;
  [SETTING_FORMAT]?: string;
  [SETTING_GET_DISPLAY_NAME]?: (() => string);
  [SETTING_GET_PARAMETERS]?: (() => {[key: string] : any});
  [SETTING_GET_VALUE]?: ((attributes?: RowAttributes) => any);
  [SETTING_GET_VALUES]?: ((() => Option[]));
  [SETTING_GROW]?: number;
  [SETTING_ICON]?: string;
  [SETTING_ID]?: number | string;
  [SETTING_IS_EMPTY_ALLOWED]?: boolean;
  [SETTING_IS_HIGHLIGHTED]?: ((attributes?: RowAttributes) => boolean);
  [SETTING_IS_NEW_VALUE_ALLOWED]?: boolean;
  [SETTING_LENGTH]: number;
  [SETTING_MAX]: number;
  [SETTING_ON_CLICK]?: ((event: Event) => void);
  [SETTING_ORDER]?: number;
  [SETTING_PARAMETERS]?: {[key: string] : any};
  [SETTING_PREFIX]?: string;
  [SETTING_POSTFIX]?: string;
  [SETTING_READ_ONLY]?: boolean;
  [SETTING_REFRESH_AT]?: number;
  [SETTING_ROUTE]?: string;
  [SETTING_SAVE_ON_BLUR]?: boolean;
  [SETTING_SECONDS_DENOMINATOR]?: number;
  [SETTING_SHRINK]?: number;
  [SETTING_THOUSAND_SEPARATOR]?: number;
  [SETTING_TYPE]?: CellComponent;
  [SETTING_VALUES]?: Option[];
  [key: Settings]: any
}

export type SettingsData = SettingsList[]

export interface SettingsStoreConstructor {
  initialValue?: SettingsList[];
}

export interface SettingsStore extends Writable<SettingsData> {
  add: {(column: string, values : {[key: Settings] : any}) : void};
  getColumn: {(column: string) : any};
  getColumnPosition: {(column: string) : number};
  getValidator: {(column: string) : ValidatorStore};
  setValidators: {(validators: {[key: string] : ValidatorStore}) : void};
  updateColumn: {(column : string, values: {[key: Settings] : any})};
  updateColumnProperty: {(
    column: string,
    key: Settings,
    value: any
  ) : void};
}

export const SORT_DIRECTION_ASCENDING = 'asc'

export const SORT_DIRECTION_DESCENDING = 'desc'

export const ALLOWED_SORT_DIRECTIONS = [
  SORT_DIRECTION_ASCENDING,
  SORT_DIRECTION_DESCENDING,
]

export interface SortActionParameters {
  callback?: (() => void);
  column: string;
  contextKey: TableContextKey;
}

export type SortDirection = typeof ALLOWED_SORT_DIRECTIONS[number]

export interface SortStoreConstructor {
  initialValue?: {
    [key: string]: SortDirection
  };
}

export interface SortData {
  [key: string]: SortDirection
}

export interface SortStore extends Writable<SortData> {
  get: {(column: string) : SortDirection};
  setColumn: {(column : string, direction : SortDirection) : void};
}

export const STATUS_BEST = 'best'

export const STATUS_BETTER = 'better'

export const STATUS_GOOD = 'good'

export const STATUS_WORSE = 'worse'

export const STATUS_WORST = 'worst'

export const ALLOWED_STATUSES = [
  STATUS_BEST,
  STATUS_BETTER,
  STATUS_GOOD,
  STATUS_WORSE,
  STATUS_WORST,
]

export type Status = typeof ALLOWED_STATUSES[number]

export interface TapBuffer {
  timer?: number;
  originalTarget?: HTMLElement;
  lastTouchedClientX?: number,
  lastTouchedClientY?: number,
  lastTouchedTarget?: HTMLElement
}

export interface TableContextConstructor {
  actions?: ActionStoreConstructor;
  components?: {[key: RowKey] : CellComponent[]};
  data?: DataData;
  dataStore?: DataStore;
  filters?: FilterData;
  getKey?: GetKey;
  loader?: LoaderStore;
  // originalData?: OriginalDataData;
  pageDetails?: PageDetailStoreConstructor;
  pager?: PagerData;
  // rowKeys?: RowKeyData;
  rowMeta?: RowMetaData;
  rowSelection?: RowSelectionData;
  savedSelection?: RowKey[];
  screens?: ScreenData;
  selection?: SelectionData;
  settings?: SettingsData;
  sort?: SortData;
}

export interface TableContextKey {
  key?: string;
}

export interface TableContext {
  actions: ActionStore;
  components: ComponentStore;
  data: DataStore;
  filters: FilterStore;
  getKey: {(rowAttributes: RowAttributes) : RowKey};
  instance: {};
  loader: LoaderStore;
  meta: MetaStore;
  originalData: OriginalDataStore;
  pageDetails: PageDetailStore;
  pager: PagerStore;
  rowKeys: RowKeyStore;
  rowMeta: RowMetaStore;
  rowSelection: RowSelectionStore;
  savedSelection: SavedSelectionStore;
  screens: ScreenStore;
  selection: SelectionStore;
  settings: SettingsStore;
  sort: SortStore;
}