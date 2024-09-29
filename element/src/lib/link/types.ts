export interface LinkProps {
  getNamedParameters?: (() => {[key: string] : string});
  name: string;
  namedParameters: {[key: string] : string};
  value: string;
}

export const COMPONENT_LINK = 'link'