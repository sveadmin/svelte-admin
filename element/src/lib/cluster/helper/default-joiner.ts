export function defaultJoiner(valueParts: any | any[] | undefined, dynamicParts?: any) : any {
  if (dynamicParts.length === 1) {
    return valueParts[0]
  }
  return valueParts
}