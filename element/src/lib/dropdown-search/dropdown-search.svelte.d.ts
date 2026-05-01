import type { Component } from 'svelte'
import {
  DropdownSearchInputProps,
} from './types.js'

interface DropdownSearchExportProps {
  getOption: () => OptionIndexed | undefined;
}

export declare const DropdownSearch: Component<DropdownSearchInputProps> & DropdownSearchExportProps