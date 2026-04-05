import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
  TranslationStore,
} from '@sveadmin/common'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  SveadminComponent,
  SveadminComponentMask,
  SveadminElementConfig,
} from '$lib/types.js'

import type {
  ComponentStore,
} from '$lib/component/index.js'

export interface ClusterDisplayProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  childrenConfig?: {[key: string] : SveadminComponent<
    any,
    SveadminElementConfig | undefined,
    SveadminElementConfig | undefined
  >}; //This property is untyped, it matches via the index number
      // or through named properties used in the mask
  components?:ComponentStore;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  error?: Snippet<[IsValid]>;
  mask?: SveadminComponentMask;
  maskPartReducer?: maskPartReducerFunction;
  splitter?: splitterFunction;
  joiner?: joinerFunction;
}

export interface ClusterWrappedDisplayProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClusterDisplayProps
{
}

export type joinerFunction = (
  valueParts: any | any[] | undefined,
  maskParsed?: SveadminComponent<any>[]
) => any

export type maskPartReducerFunction = (
  aggregator: SveadminComponent<any>[],
  currentPart: SveadminComponent<any> | string
) => SveadminComponent<any>[]

export type splitterFunction = (
  valueToSplit: any,
  maskParsed?: SveadminComponent<any>[],
  i18n?: TranslationStore,
) => any[]