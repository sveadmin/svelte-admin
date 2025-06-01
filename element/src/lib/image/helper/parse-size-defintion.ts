import type {
  SizeDefinition
} from '../types.js'

export function parseSizeDefinition(definition: string | SizeDefinition) : string {
  if (typeof definition === 'string') {
    return definition
  }

  const condition = (typeof definition.condition === 'string')
    ? definition.condition
    : definition.condition.size + (definition.condition.unit ?? 'px')

  const value = (typeof definition.value === 'string')
    ? definition.value
    : definition.value.size + (definition.value.unit ?? 'px')

  return [
    '(',
    definition.attribute,
    ': ',
    condition,
    ') ',
    value
  ].join('')
}