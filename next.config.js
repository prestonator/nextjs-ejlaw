/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "strapi.eltonjenkinslaw.com",
				port: "",
				pathname: "/uploads/**",
			},
		],
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: "graphql-tag/loader",
				},
			],
		});
		// Important: return the modified config
		return config;
	},
};
