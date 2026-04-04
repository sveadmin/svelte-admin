import type {
  Snippet,
} from 'svelte'

import type {
  IsValid,
  TranslationStore,
  ValidatorStore,
} from '@sveadmin/common'

import type {
  AllowedSize,
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  CommonInputProps,
  DataOptional,
  KeyMap,
  OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
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
  splitter?: (
    valueToSplit: any,
    maskParsed?: SveadminComponent<any>[],
    i18n?: TranslationStore,
  ) => any[];
  joiner?: (valueParts: any | any[] | undefined, maskParsed?: SveadminComponent<any>[]) => any;
}

export interface ClusterWrappedDisplayProps extends
  ChildrenClassListOptional,
  ChildrenStyleOptional,
  ClusterDisplayProps
{
}

export interface MaskPartReducerProps extends DataOptional,
  OnBlurOptional,
  OnChangeOptional,
  OnErrorOptional,
  OnFocusOptional,
  OnInitOptional,
  OnInputOptional,
  OnKeyDownOptional,
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional
 {
  id: string;
  keyMap?: KeyMap;
  nestedValidators: {[key: number] : ValidatorStore},
  size?: AllowedSize;
}