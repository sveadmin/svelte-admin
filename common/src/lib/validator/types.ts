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

export interface CaseComparatorData extends CaseComparisonValidatorData,
  ErrorCode
{
  comparator: (a?: string) => boolean;
  getIdentity?: (base?: string) => string;
}

export interface CaseComparisonValidatorData extends ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
{
}

interface CommonValidator {
  data?: {[key: string]: any};
  skipValidation?: boolean; //Used in nested validator
}

export interface ComparatorData extends ComparisonValidatorData,
  ErrorCode
{
  comparator: (a: number, b: number) => boolean;
  getIdentity?: (base?: string) => string;
}

export interface ComparisonValidatorData extends ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
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

export interface DateValidatorData extends ErrorCodeOptional,
  ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
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

export interface ErrorCode {
  errorCode: string;
}

export interface ErrorCodeOptional {
  errorCode?: string;
}

export interface ErrorMessageOptional {
  errorMessage?: string;
}

export interface FieldValidatorData extends ErrorCodeOptional,
  ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
{
  dataSet?: {[key: string] : any}; 
  fieldName: string;
  ignoreEmpty?: boolean;
  strictComparison?: boolean;
}

export interface GenericValidatorData extends ErrorCodeOptional,
  ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
{
}

export const identityKey = Symbol('identity')

export interface IsValid {
  message?: string;
  error?: string;
  valid: boolean;
  validatedValue?: any;
}

export interface IsValidatedValueAddedOptional {
  isValidatedValueAdded?: boolean;
}

export interface ListValidatorData extends ErrorCodeOptional,
  ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
{
  isCaseSensitive?: boolean;
  lookupTable?: LookupTable | LookupTableFunction | Map<string, boolean> | string[];
}

export interface NumberFunction {
  (): number
}

export interface NumberValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: number;
}

export interface OrValidatorData extends OrValidatorsOptional
{
  previousResult: IsValid;
  value: any;
}

export interface OrValidatorsOptional {
  orValidators?: ValidatorFunction[];
}

export interface RegexValidatorData extends ErrorCodeOptional,
  ErrorMessageOptional,
  IsValidatedValueAddedOptional,
  OrValidatorsOptional,
  ValueFallback
{
  pattern: RegExp | string
}

export interface StringFunction {
  (): string
}

export interface StringValidator extends CommonValidator {
  data?: ComparisonValidatorData & DateValidatorData;
  value: string;
}

export interface ValidatorFunction {
  (params?: AnyValidator) : IsValid;
  [identityKey]?: string
}

export interface Validator {
  validate: (params: AnyValidator | any) => IsValid;
}

export interface ValidatorStoreData {
  identities: Array<string | undefined>;
  result: IsValid;
  validators: ValidatorFunction[];
}

export interface ValidatorStore extends ValidatorStoreData {
  appendValidator: (validator: ValidatorFunction) => void;
  prependValidator: (validator: ValidatorFunction) => void;
  validate: (params?: AnyValidator | any) => IsValid;
  validateElement: (event: Event) => IsValid;
}

export interface ValueFallback {
  valueFallback?: any | (() => any);
}
