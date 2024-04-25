/**
 * Retrieves the previous n elements from a circular array, given an index.
 *
 * @param array The input array
 * @param index The current index (can be larger than array length)
 * @param n The number of previous elements to retrieve
 * @returns An array of the n previous elements
 */
export const previousNth = <T>(array: T[], index: number, n: number): T[] => {
  const len = array.length;
  // Normalize the index to handle circular cases
  const normalizedIndex = index % len;
  const result = [];
  const nbPresvious = Math.min(n, index + 1);
  for (let i = 0; i < nbPresvious; i++) {
    // Calculate the position, wrapping around the array if necessary
    const pos = (normalizedIndex - i + len) % len;
    // Add the element to the beginning of the result array
    result.unshift(array[pos]);
  }

  return result;
};
