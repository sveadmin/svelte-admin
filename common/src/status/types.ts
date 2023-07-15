import {
  Writable
} from 'svelte/store';

export const STATUS_TYPE_NORMAL = 'normal'

export const STATUS_TYPE_ERROR = 'error'

export const STATUS_ALLOWED_TYPES = [
  STATUS_TYPE_ERROR,
  STATUS_TYPE_NORMAL,
]

export interface StatusMessage {
  message: string;
  type: typeof STATUS_ALLOWED_TYPES[number];
  dismissed?: boolean;
  id?: number;
  time?: Date;
}

export interface StatusStore extends Writable<StatusMessage[]> {
  add: (parameters: StatusMessage) => void;
  dismiss: (id: number) => void;
}