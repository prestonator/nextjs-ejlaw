/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "strapi.eltonjenkinslaw.com",
				port: "",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "ej-law-space.sfo3.cdn.digitaloceanspaces.com",
				port: "",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "maps.googleapis.com",
				port: "",
				pathname: "/maps/**",
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

export default bundleAnalyzer(nextConfig);
