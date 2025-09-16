export const makeFetch = async (url, options = {}) => {
  const { method = 'GET', body, headers = {} } = options;
  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  const response = await fetch(url, fetchOptions);
  return await response.json();
};