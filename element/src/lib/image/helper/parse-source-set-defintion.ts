import type {
  SourceSetDefinition
} from '../types.js'

export function parseSourceSetDefinition(definition: string | SourceSetDefinition) : string {
  let parsedDefinition : string
  if (typeof definition === 'string') {
    return definition
  }

  parsedDefinition = definition.src
  if (definition.size) {
    parsedDefinition += ' ' + definition.size + (definition.unit ?? 'w')
  }

  return parsedDefinition
}