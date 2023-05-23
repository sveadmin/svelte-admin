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

import {
  Component,
  SelectionItem,
  ValueGetter,
} from '@sveadmin/element'


export interface RowAttributes {
  [key: string] : any;
}

export interface Row {
  id: string;
  type: string;
  attributes: RowAttributes;
}

export interface Action {
  activeMetaField?: string;
  interval?: number,
  label: string,
  metaField?: string;
  callback: (row: Row) => boolean | Promise<boolean>;
  failCallback?: (row: Row) => void | Promise<void>;
  finalCallback?: () => void | Promise<void>;
  successCallback?: (row: Row) => void | Promise<void>;
}

export interface ActionStoreConstructor {
  generic?: Action[];
  row?: Action[];
  column?: {
    title?: Action;
    buttons?: Action[];
  }
}

export interface ActionData {
  generic: Action[];
  row: Action[];
  column: {
    title: Action;
    buttons: Action[];
  }
}

export interface ActionStore extends Writable<ActionData> {
}

export interface ComponentCondition {
  (rowAttributes: RowAttributes, originalAttributes: RowAttributes) : boolean;
}

export interface ComponentConditionSetting {
  condition: ComponentCondition,
  component: Component,
}

export type ComponentData = {[key: RowKey] : Component[]}

export interface ComponentStore extends Writable<ComponentData> {
  exists: {(rowId: RowKey, columnIndex: number) : boolean};
  getByIndex: {(rowId: RowKey, columnIndex: number) : Component | null};
  setByIndex: {(
    rowId: RowKey,
    columnIndex: number,
    component: Component
  ) : void};
}

export type DataData = Row[]

export interface DataStore extends Writable<DataData> {
  getRow: {(rowIndex: number) : Row | null};
  getRowAttributes: {(rowIndex: number) : RowAttributes | null};
  getRowProperty: {(rowIndex: number, property: string) : any};
  updateIfChanged: {(updater: (currentValue: Row[]) => Row[]) : void};
}

export interface Filter {
  [key: string] : any;
}

export interface FilterStoreConstructor {
  importedFilter?: Filter;
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

export type RowKey = string | number

export type RowKeyData = RowKey[]

export interface RowKeyStore extends Writable<RowKeyData> {
}

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
  left: number;
  top: number;
  right: number;
  bottom: number;
  anchorBaseColumn: number;
  anchorBaseRow: number;
  anchorTipColumn: number;
  anchorTipRow: number;
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

export const SETTING_BASE = 'base'

export const SETTING_COLUMN_VISIBLE = 'columnVisible'

export const SETTING_DECIMALS = 'decimals'

export const SETTING_DEFAULT_LOCALE = 'defaultLocale'

export const SETTING_DIGITS = 'digits'

export const SETTING_DISPLAY_MODE = 'displayMode'

export const SETTING_DISPLAY_NAME = 'displayName'

export const SETTING_FIELD = 'field'

export const SETTING_FORMAT = 'format'

export const SETTING_GROW = 'grow'

export const SETTING_ID = 'id'

export const SETTING_LOCALES = 'locales'

export const SETTING_MAX = 'max'

export const SETTING_ORDER = 'order'

export const SETTING_PREFIX = 'prefix'

export const SETTING_PRIVILEGES = 'privileges'

export const SETTING_POSTFIX = 'postfix'

export const SETTING_READ_ONLY = 'readOnly'

export const SETTING_REPEATED_COLUMNS = 'repeatedColumns'

export const SETTING_ROUTE = 'route'

export const SETTING_SHRINK = 'shrink'

export const SETTING_TYPE = 'type'

export const SETTING_VALIDATOR = 'validator'

export const SETTING_VALUES = 'values'

export const SETTING_VALUES_COLLECTION = 'valueCollection'

export const SETTINGS = [
  SETTING_ACTIONS,
  SETTING_ALIGN,
  SETTING_BASE,
  SETTING_COLUMN_VISIBLE,
  SETTING_DECIMALS,
  SETTING_DEFAULT_LOCALE,
  SETTING_DIGITS,
  SETTING_DISPLAY_MODE,
  SETTING_DISPLAY_NAME,
  SETTING_FIELD,
  SETTING_FORMAT,
  SETTING_GROW,
  SETTING_ID,
  SETTING_LOCALES,
  SETTING_MAX,
  SETTING_ORDER,
  SETTING_PREFIX,
  SETTING_PRIVILEGES,
  SETTING_POSTFIX,
  SETTING_READ_ONLY,
  SETTING_REPEATED_COLUMNS,
  SETTING_ROUTE,
  SETTING_SHRINK,
  SETTING_TYPE,
  SETTING_VALIDATOR,
  SETTING_VALUES,
  SETTING_VALUES_COLLECTION,
]

export type Settings = typeof SETTINGS[number]

export type SettingsList = {[key: Settings]: any}

export type SettingsData = SettingsList[]

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
  importedSort?: {
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
  actions?: ActionStore;
  components?: ComponentStore;
  data?: DataStore;
  editors?: any;
  filters?: FilterStore;
  getKey?: GetKey;
  loader?: LoaderStore;
  originalData?: OriginalDataStore;
  pageDetails?: PageDetailStore;
  pager?: PagerStore;
  rowKeys?: RowKeyStore;
  rowMeta?: RowMetaStore;
  rowSelection?: RowSelectionStore;
  savedSelection?: SavedSelectionStore;
  screens?: ScreenStore;
  selection?: SelectionStore;
  settings?: SettingsStore;
  sort?: SortStore;
}

export interface TableContextKey {
  key?: string;
}

export interface TableContext {
  actions: ActionStore;
  components: ComponentStore;
  data: DataStore;
  editors: any;
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