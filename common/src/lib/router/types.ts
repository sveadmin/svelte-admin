import type { Component } from 'svelte';

export interface NamedRoute {
  name: string;
  namedParameters?: {[key: string] : any};
  unnamedParameters?: [];
  queryParameters?: {};
}

export interface RoutingParameters {
  namedParameters?: {[key: string] : string},
  fullString?: string,
  unnamedParameters?: string[]
}

export interface AddRouteParameters {
  component: Component;
  name?: string;
  route: string;
}

export interface RegexRoute {
  regex: RegExp;
  component: Component
}

export interface RouterData {
  current: string;
  currentComponent: Component;
  errorComponents: {
    [key: string] : Component;
  },
  namedRoutes?: {[key: string] : string},
  routes: {
    normal: {[key: string] : Component};
    regex: RegexRoute[];
  }
  routingHelpers: {
    requiresHistoryEntry: boolean;
  };
  routingParameters?: RoutingParameters
}

export interface RouterStore {
  add: (parameters: AddRouteParameters) => void;
  get: (route: string) => Component;
  getNamedRoute: (parameters: NamedRoute) => string;
  navigate: (
    path: string,
    routingParameters?: RoutingParameters
  ) => void;
  navigateFromLink: (
    event: MouseEvent,
    routingParameters?: RoutingParameters,
    callback?: (path: string, routingParameters?: RoutingParameters) => void
  ) => void;
  routes: RouterData;
  setCurrentRoute: (path: string, doesRequireHistoryEntry: boolean) => void;
  setRoutingParameters: (parameters: RoutingParameters) => void;
  setRequiresHistoryEntry: (value: boolean) => void;
}