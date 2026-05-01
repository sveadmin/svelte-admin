import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
} from '@sveadmin/common'

import type {
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  splitterFunction,
  SveadminComponent,
  SveadminComponentMask,
  SveadminElementConfig,
} from '$lib/types.js'

import type {
  ComponentStore,
} from '$lib/component/index.js'

export interface ClusterDisplayProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  childrenConfig?: {
    [key: string] : SveadminComponent<
      any,
      SveadminElementConfig | undefined,
      SveadminElementConfig | undefined
    >,
  }; //This property is untyped, it matches via the index number
      // or through named properties used in the mask
  components?:ComponentStore;
  error?: Snippet<[IsValid]>;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  joiner?: joinerFunction;
  mask?: SveadminComponentMask;
  maskPartReducer?: maskPartReducerFunction;
  splitter?: splitterFunction;
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