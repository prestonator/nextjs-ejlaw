// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://www.eltonjenkinslaw.com",
	generateRobotsTxt: true,
	exclude: ["/server-sitemap-index.xml"], // <= exclude here
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				disallow: ["/landing", "/landing/*", "/landing/divorce"],
			},
		],
		additionalSitemaps: [
			"https://www.eltonjenkinslaw.com/server-sitemap-index.xml", // <==== Add here
		],
	},
};
