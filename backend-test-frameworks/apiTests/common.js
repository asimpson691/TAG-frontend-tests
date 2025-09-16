const makeFetch = async (url, options = {}) => {
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
  
  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return { status: response.status, data: result };
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { makeFetch };