import type {
  Component,
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

export const COMPONENT_CLUSTER = 'cluster'

export const COMPONENT_CLUSTER_WRAPPED = 'cluster-wrapped'

export interface ComponentCluster extends SveadminComponent<
  typeof COMPONENT_CLUSTER,
  undefined,
  undefined,
  ClusterDisplayProps
>
{
}

export interface ComponentClusterWrapped extends SveadminComponent<
  typeof COMPONENT_CLUSTER_WRAPPED,
  undefined,
  undefined,
  ClusterWrappedDisplayProps
>
{
}

export interface ClusterDisplayProps extends CommonInputProps {
  areErrorsVisible?: boolean;
  childrenConfig?: {
    [key: string] : SveadminElementConfig | undefined,
  }; //This property is untyped, it matches via the index number
      // or through named properties used in the mask
  componentConfig?: {
    [key: string] : SveadminComponent<
      any,
      Component | undefined,
      SveadminElementConfig | undefined,
      SveadminElementConfig | undefined
    > | undefined,
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
  Omit<ClusterDisplayProps, 'childrenConfig'>
{
  childrenConfig?: {
    0?: ClusterDisplayProps,
    cluster?: ClusterDisplayProps,
    [key: string] : SveadminElementConfig | undefined,
  },
  componentConfig?: {
    0?: ComponentCluster,
    cluster?: ComponentCluster,
    [key: string] : SveadminComponent<
      any,
      Component | undefined,
      SveadminElementConfig | undefined,
      SveadminElementConfig | undefined
    > | undefined,
  }
}

export type joinerFunction = (
  valueParts: any | any[] | undefined,
  maskParsed?: SveadminComponent<any>[]
) => any

export type maskPartReducerFunction = (
  aggregator: SveadminComponent<any>[],
  currentPart: SveadminComponent<any> | string
) => SveadminComponent<any>[]