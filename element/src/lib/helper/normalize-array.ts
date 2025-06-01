export function normalizeArray(arrayCandidate: string | any[] | undefined, separator: string = ',') {
  if (!arrayCandidate) {
    return []
  }
  if (Array.isArray(arrayCandidate)) {
    return arrayCandidate
  } else {
    return arrayCandidate.split(separator)
  }
}