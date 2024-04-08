import "server-only";

export const fetchData = async (query, variables) => {
	const endpoint = process.env.STRAPI_GRAPHQL_ENDPOINT;
	const apiToken = process.env.STRAPI_API_KEY;
	try {
		const res = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiToken}`,
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return await res.json();
	} catch (error) {
		throw new Error(`Failed to fetch data: ${error.message}`);
	}
};
