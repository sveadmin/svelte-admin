export const STATUS_TYPE_NORMAL = 'normal'

export const STATUS_TYPE_ERROR = 'error'

export const STATUS_ALLOWED_TYPES = [
  STATUS_TYPE_ERROR,
  STATUS_TYPE_NORMAL,
]

type Detail = string | {[key: string] : Detail }

export interface StatusData {
  messages: StatusMessage[];
}

export interface StatusMessage {
  detail?: Detail;
  dismissed?: boolean;
  id?: number;
  message: string;
  route?: string;
  time?: Date;
  type?: typeof STATUS_ALLOWED_TYPES[number];
}

export interface StatusStore {
  add: (parameters: StatusMessage | string) => void;
  dismiss: (id: number) => void;
  messages: StatusMessage[];
}