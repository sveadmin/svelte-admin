import type {
  Icon,
  IconProperty,
} from '$lib/types.js'

export function normalizeIcon(icon: IconProperty) : Icon[] | undefined {
  if (!icon) {
    return
  }

  if (Array.isArray(icon)) {
    return icon.map((currentIcon: string | Icon) => (typeof currentIcon === 'string')
      ? {icon: currentIcon}
      : currentIcon)
  }

  if (typeof icon === 'string') {
    return [{
      icon: icon
    }]
  }

  return [icon]
}