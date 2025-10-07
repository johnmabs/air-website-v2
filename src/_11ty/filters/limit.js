/**
 *
 * @param {Array} array
 * @param {Number} limit
 * @returns sliced array
 */

function limit(array, limit, offset = 0) {
  return array.slice(offset, limit + offset);
}

export { limit };
