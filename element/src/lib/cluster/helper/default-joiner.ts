export function defaultJoiner(valueParts: any | any[], dynamicParts?: any) : any {
  if (dynamicParts.length === 1) {
    return valueParts[0]
  }
  return valueParts
}