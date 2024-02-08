import { SvelteComponent } from 'svelte';

import {
  Writable
} from 'svelte/store';

export interface NamedRoute {
  name: string;
  namedParameters?: {};
  unnamedParameters?: [];
  queryParameters?: {};
}

export interface RoutingParameters {
  namedParameters?: {[key: string] : string},
  fullString?: string,
  unnamedParameters?: string[]
}

export interface AddRouteParameters {
  component: typeof SvelteComponent;
  name?: string;
  route: string;
}

export interface RegexRoute {
  regex: RegExp;
  component: typeof SvelteComponent
}

export interface RouterData {
  current: string;
  currentComponent: typeof SvelteComponent;
  errorComponents: {
    [key: string] : typeof SvelteComponent;
  },
  namedRoutes?: {[key: string] : string},
  routes: {
    normal: {[key: string] : typeof SvelteComponent};
    regex: RegexRoute[];
  }
  routingHelpers: {
    requiresHistoryEntry: boolean;
  };
  routingParameters?: RoutingParameters
}

export interface RouterStore extends Writable<RouterData> {
  add: (parameters: AddRouteParameters) => void;
  get: (route: string) => typeof SvelteComponent;
  getNamedRoute: (parameters: NamedRoute) => string;
  navigate: (
    path: string,
    routingParameters?: RoutingParameters
  ) => void;
  navigateFromLink: (
    event: MouseEvent,
    routingParameters?: RoutingParameters,
    callback?: (path: string, routingParameters?: RoutingParameters) => void
  ) => void
  setCurrentRoute: (path: string, doesRequireHistoryEntry: boolean) => void;
  setRoutingParameters: (parameters: RoutingParameters) => void;
  setRequiresHistoryEntry: (value: boolean) => void;
}