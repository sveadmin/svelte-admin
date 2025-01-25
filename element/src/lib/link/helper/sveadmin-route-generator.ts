import {
  router,
} from '@sveadmin/common'

export function sveadminRouteGenerator (
  baseUrl: string,
  name: string,
  namedParameters: {[key: string] : string}
) : string {
  if (!name) {
    return baseUrl
  }
  return baseUrl + router.getNamedRoute(
    {
      name,
      namedParameters
    }
  )
}