import type {
  LookupTable,
  LookupTableFunction,
} from '../types.js'

export interface AnyValidator extends CommonValidator {
  data?: ListValidatorData & DateValidatorData & FieldValidatorData;
  value: any;
}

export interface AnyValidatorFunction {
  (): AnyValidator;
}

interface CommonValidator {
  data?: {[key: string]: any};
  skipValidation?: boolean; //Used in nested validator
}

export interface ComparatorData extends ComparisonValidatorData,
  ErrorMessageOptional
{
  comparator: (a: number, b: number) => boolean;
}

export interface ComparisonValidatorData extends ValueFallback,
  ErrorMessageOptional
{
  base?: number | NumberFunction | Date | DateFunction;
}

export interface DateFunction {
  (): Date
}

export interface DatePartValidator {
  day?: number;
  month?: number;
  year?: number;
}

export interface DateValidatorData extends ValueFallback,
  ErrorMessageOptional
{
  datePartValidator?: DatePartValidator | (() => DatePartValidator);
}

export interface DateValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: Date;
}

export interface DynamicValidatorFunction {
  (): ValidatorFunction[]
}

export interface EmailValidatorData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface ErrorMessageOptional {
  errorMessage?: string;
}

export interface FieldValidatorData extends ValueFallback,
  ErrorMessageOptional
{
  dataSet?: {[key: string] : any}; 
  fieldName: string;
  ignoreEmpty?: boolean;
  strictComparison?: boolean;
}

export interface HasMemberValidatorData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface HasLowercaseData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface HasUppercaseData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface IsValid {
  dirty?: boolean;
  message?: string;
  error?: string;
  valid: boolean;
  validatedValue?: any;
  validator?: string;
}

export interface ListValidatorData extends ValueFallback,
  ErrorMessageOptional
{
  isCaseSensitive?: boolean;
  lookupTable?: LookupTable | LookupTableFunction;
}

export interface NumberFunction {
  (): number
}

export interface NumberValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: number;
}

export interface OnlyLowercaseData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface OnlyUppercaseData extends ValueFallback,
  ErrorMessageOptional
{
}


export interface RequiredValidatorData extends ValueFallback,
  ErrorMessageOptional
{
}

export interface RegexValidatorData extends ValueFallback,
  ErrorMessageOptional
{
  pattern: RegExp | string
}

export interface StringValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: string;
}

export interface ValidatorFunction {
  (params?: AnyValidator) : IsValid;
}

export interface Validator {
  validate: (params: AnyValidator | any) => IsValid;
}

export interface ValidatorStore {
  appendValidator: (validator: ValidatorFunction) => void;
  prependValidator: (validator: ValidatorFunction) => void;
  getValidators: () => ValidatorFunction[];
  result: IsValid;
  validate: (params?: AnyValidator | any) => IsValid;
  validateElement: (event: Event) => IsValid;
}

export interface ValueFallback {
  valueFallback?: any | (() => any);
}