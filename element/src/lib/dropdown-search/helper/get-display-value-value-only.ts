export function getDisplayValueValueOnly (value: string | number | null) : string | null {
  return value?.toString() ?? ''
}