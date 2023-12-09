// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from "next-sitemap";
import xml2js from "xml2js";

const API_KEY = process.env.STRAPI_API_KEY;
const SITEMAP_ENDPOINT = process.env.STRAPI_MEDIA_ENDPOINT;

async function getResponse(url) {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/xml",
				Authorization: `Bearer ${API_KEY}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch data");
		}
		return response.text();
	} catch (error) {
		console.error(`Failed to fetch data: ${error.message}`);
		return null;
	}
}

function parseXMLToJSON(data) {
	return new Promise((resolve, reject) => {
		const parser = new xml2js.Parser();
		parser.parseString(data, (err, result) => {
			if (err) {
				console.error(`Failed to parse XML: ${err.message}`);
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

function mapDataToSitemap(data) {
	return data.urlset.url.map(({ loc, priority, changefreq }) => ({
		loc: loc[0],
		lastmod: new Date().toISOString(),
		priority: parseFloat(priority[0]),
		changefreq: changefreq[0],
	}));
}

export async function GET(request) {
	const data = await getResponse(`${SITEMAP_ENDPOINT}/api/sitemap/index.xml`);

	const result = await parseXMLToJSON(data);
	const sitemap = mapDataToSitemap(result);
	console.log(sitemap);
	return getServerSideSitemap(sitemap);
}
