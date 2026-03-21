export function pickFirstJoiner(valueParts: any | any[], dynamicParts?: any) : any {
  return Array.isArray(valueParts)
    ? valueParts[0]
    : valueParts
}