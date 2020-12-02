/**
 * Extracts key value pairs from response headers Link if provided.
 * Otherwise it returns empty object.
 * @param  {String} headersLink - Text returned by response.headers.get('Link')
 * @return {Object} - Object containing linked relations as keys and urls as values
 */
export const parseHeadersLink = (headersLink) => {
  if (!headersLink) return {};

  const els = headersLink.split(',')
  const links = {}

  els.forEach(el => {
    const subEls = el.split(';');
    if (subEls.length === 2) {
      const url = subEls[0].replace(/<(.*)>/, '$1').trim();
      const key = subEls[1].replace(/rel="(.*)"/, '$1').trim();
      links[key] = url;
    }
  });

  return links;
};

/**
 * Utility to fetch from provided url and parse response as JSON.
 * Invokes callback if provided.
 * This method uses Fetch Web API.
 * @param   {Object} kwargs
 * @param   {String} kwargs.url - Path to the API resource
 * @param   {requestCallback} [kwargs.cb] - The callback function to handle the response data
 * @param   {Object} [kwargs.customOptions] - Request options
 * @returns {Promise<any>} Response object wrapped inside a Promise
 */
export const fetchApi = async ({ url, cb, customOptions }) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...customOptions
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && cb) cb(data);

    return response
  } catch (error) {
    console.error(error); // IF FOR REAL: register error in error monitoring system
  }
};

/**
 * Utility to fetch all paginated responses from provided url based on related links in response headers.
 * Iteratively invokes provided callback with single page data sequence.
 * @param  {Object} kwargs
 * @param  {String} kwargs.url - Path to the API resource
 * @param  {requestCallback} kwargs.cb - The callback function to iteratively handle the response data
 */
export const fetchAll = async ({ url, cb }) => {
  let next = url;

  while (next) {
    try {
      const { headers } = await fetchApi({ url: next, cb });
      ({ next } = parseHeadersLink(headers.get('Link')));
    } catch {
      next = undefined;
    }
  }
};

/**
 * @callback requestCallback
 * @param {Array} data - Parsed response data stream
 */


/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  parseHeadersLink,
  fetchApi,
  fetchAll
};
