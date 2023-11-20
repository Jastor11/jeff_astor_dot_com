export function frequencyMap<T>(iterable: Array<T>): Map<T, number> {
  const frequencies: Map<T, number> = new Map()

  for (const element of iterable) {
    const newOccurrences = (frequencies.get(element) ?? 0) + 1

    frequencies.set(element, newOccurrences)
  }

  return frequencies
}
