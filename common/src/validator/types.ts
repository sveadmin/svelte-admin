import {
  Readable
} from 'svelte/store';

export interface IsValid {
  dirty?: boolean;
  message?: string | null;
  error?: string | null;
  valid: boolean;
}

export interface AnyValidator {
  data?: {[key: string]: any},
  value: any;
}

export interface DateValidator {
  data?: {[key: string]: any},
  value: Date | string;
}

export interface StringValidator {
  data?: {[key: string]: any},
  value: string;
}

export interface NumberFunction {
  (): number
}

export interface DateFunction {
  (): Date
}

export interface ValidatorFunction {
  (params: AnyValidator | StringValidator) : IsValid; 
}

export interface DynamicValidatorFunction {
  (): ValidatorFunction[]
}

export interface ValidatorStore extends Readable<IsValid> {
  appendValidator: (validator: ValidatorFunction) => void;
  prependValidator: (validator: ValidatorFunction) => void;
  validate: (value: any, dirty?: boolean, ...params: any[]) => IsValid;
  validateElement: (event: Event) => IsValid;
}