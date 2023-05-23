import { SvelteComponent } from 'svelte';

import {
  Writable
} from 'svelte/store';

export interface NamedRouteParameters {
  name: string;
  namedParameters?: {};
  unnamedParameters?: [];
}

export interface RoutingParameters {
  named: {[key: string] : string},
  fullString?: string,
  unnamed?: string[]
}

export interface AddRouteParameters {
  route: string;
  component: typeof SvelteComponent;
  name?: string;
}

export interface RegexRoute {
  regex: RegExp;
  component: typeof SvelteComponent
}

export interface RouterData {
  current: string;
  errorComponents: {
    [key: string] : typeof SvelteComponent;
  },
  namedRoutes?: {[key: string] : string},
  routes: {
    normal: {[key: string] : typeof SvelteComponent};
    regex: RegexRoute[];
  }
  routingHelpers: {
    wasBackButtonUsed: boolean;
  };
  routingParameters?: {
    namedParameters?: {};
    unnamedParameters?: string[];
  }
}

export interface RouterStore extends Writable<RouterData> {
  add: (parameters: AddRouteParameters) => void;
  getNamedRoute: (parameters: NamedRouteParameters) => string;
  navigate: (
    path: string,
    routingParameters?: RoutingParameters
  ) => void;
  navigateFromLink: (
  event: MouseEvent,
  routingParameters: RoutingParameters,
  callback: (path: string, routingParameters?: RoutingParameters) => void
) => void
  setRoutingParameters: (parameters: RoutingParameters) => void;
  setWasBackButtonUsed: (value: boolean) => void;
}