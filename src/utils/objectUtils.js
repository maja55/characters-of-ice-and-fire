/**
 * Returns a singleton array containing the value provided.
 * If value is already an array, it is returned as is.
 * If no value provided, returns empty array.
 * @param {*|Array} obj - the value to ensure as Array
 * @return {Array}
 */
export function ensureArray(value) {
  if (!value) return [];
	if (!Array.isArray(value)) return [value];
	return value;
}


/**
 * Gets the value of a nested property without being unable to return x of undefined
 * @param {Object} obj - the object to search in
 * @param {string} key - the object path to search
 * @param {*} [fallbackValue] - fallback value to return if property value not found
 * @return {*} the value or the desired item or undefined (or fallbackValue if provided)
 */
export function getProp(obj, key, fallbackValue=undefined) {
  return key.split('.').reduce((o, x) => {
      return typeof o === 'undefined' || o === null ? fallbackValue : o[x];
  }, obj);
}