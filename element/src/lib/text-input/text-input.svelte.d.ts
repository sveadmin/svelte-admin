import type { Component } from 'svelte';
import {
  TextInputProps,
} from './types.js'

interface TextInputExportProps {
  validate: () => IsValid;
}

export declare const TextInput: Component<TextInputProps> & TextInputExportProps