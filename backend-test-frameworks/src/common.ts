interface Options {
	method?: string;
	body?: Record<string, unknown>;
	headers?: Record<string, string>;
}

interface FetchOptions {
	method?: string;
	body?: string;
	headers?: Record<string, string>;
}

export const makeFetch = async (url: string, options: Options = {}) => {
	const { method = "GET", body, headers = {} } = options;
	const fetchOptions: FetchOptions = {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
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
		return { status: 500, data: error.message };
	}
};
