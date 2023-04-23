import {
  Writable
} from 'svelte/store';

export const TYPE_NORMAL = 'normal'

export const TYPE_ERROR = 'error'

export const ALLOWED_TYPES = [
  TYPE_ERROR,
  TYPE_NORMAL,
]

export interface StatusMessage {
  message: string;
  type: typeof ALLOWED_TYPES[number];
  dismissed?: boolean;
  id?: number;
  time?: Date;
}

export interface StatusStore extends Writable<[StatusMessage]> {
  add: (parameters: StatusMessage) => void;
  dismiss: (id: number) => void;
}