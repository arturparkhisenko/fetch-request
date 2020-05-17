/**
 * Cancellable Fetch Request
 *
 * @param {string} input
 * @param {Object} [init]
 * @returns {Promise} request
 * @returns {function} request.cancel
 */
export const fetchRequest = (input, init) => {
  const controller = new AbortController();
  const { signal } = controller;
  const response = fetch(input, { ...init, signal });

  Object.defineProperty(response, 'cancel', {
    enumerable: true,
    value: () => controller.abort()
  });

  return response;
};
