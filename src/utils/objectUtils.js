/**
 * Returns a singleton array containing the value provided.
 * If value is already an array, it is returned as is.
 * If no value provided, returns empty array.
 * @param {*|Array} obj the value ensure as Array
 * @return {Array}
 */
export function ensureArray(obj) {
  if (!obj) return [];
	if (!Array.isArray(obj)) return [obj];
	return obj;
}

export function getProp(obj, path, fallbackValue=undefined) {
  const props = path.split('.')

  if (!obj) return fallbackValue;
  if (props.length === 0) return fallbackValue;
  if (props.length === 1) return obj[props[0]];
  if (obj[props[0]]) return getProp(obj[props[0]], props.slice(1));
};