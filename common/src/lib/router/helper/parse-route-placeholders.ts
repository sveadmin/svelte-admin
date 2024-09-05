export function parseRoutePlaceholders(route: string) : string {
  return '^' + route.replace(/:module/, ('([a-zA-Z0-9\_\-]+)'))
    .replace(/:controller/, ('([a-zA-Z0-9\_\-]+)'))
    .replace(/:action/, ('([a-zA-Z0-9\_\-]+)'))
    .replace(/:params/, ('(.*)*'))
    .replace(/:namespace/, ('([a-zA-Z0-9\_\-]+)'))
    .replace(/:int/, ('([0-9]+)'))
    .replace(/\{([^:]*):?([^\}:]*)\}/, ('(?<$1>$2)')) + '$'
}