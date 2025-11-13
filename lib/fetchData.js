import "server-only";
import { print } from "graphql";

export const fetchData = async (queryOrDoc, variables) => {
  const endpoint = process.env.STRAPI_GRAPHQL_ENDPOINT;
  const apiToken = process.env.STRAPI_API_KEY;

  if (!endpoint) {
    throw new Error("STRAPI_GRAPHQL_ENDPOINT is not set");
  }
  if (!apiToken) {
    throw new Error("STRAPI_API_KEY is not set");
  }

  const query = typeof queryOrDoc === "string" ? queryOrDoc : print(queryOrDoc);

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
      const text = await res.text();
      throw new Error(`Failed to fetch data: ${res.status} ${text}`);
    }
    return await res.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};
