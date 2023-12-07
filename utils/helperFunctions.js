import * as ReactIcons from "@/lib/reactIcons";
import { sanitize } from "isomorphic-dompurify";
import parse from "html-react-parser";
import Image from "next/image";

export const SafeImage = (imageData, styles) => {
	const strapiMediaEndpoint = process.env.STRAPI_MEDIA_ENDPOINT;
	const url = encodeURI(imageData?.attributes?.url) ?? "";
	const alt = imageData?.attributes?.alternativeText ?? "";

	return (
		<Image
			src={strapiMediaEndpoint + url}
			alt={alt}
			width={100}
			height={100}
			className={styles}
		/>
	);
};

export const SafeImageUrl = (imageData) => {
	const strapiMediaEndpoint = process.env.STRAPI_MEDIA_ENDPOINT;
	const url = encodeURI(imageData?.attributes?.url) ?? "";

	const full_url = strapiMediaEndpoint + url;

	return full_url
};


export const SafeHtml = (html) => {
	const cleanedHtml = sanitize(html);
	return parse(cleanedHtml);
};

export const IconComponent = ({ key, icon, href, customClassName }) => {
	const DynamicIconComponent = ReactIcons[icon];

	if (undefined === DynamicIconComponent) {
		return null;
	}

	return href ? (
		<a
			key={key}
			href={href}
			target="_blank"
			aria-label="Click to visit the socials for our staff."
		>
			<DynamicIconComponent className={customClassName} />
		</a>
	) : (
		<DynamicIconComponent key={icon} className={customClassName} />
	);
};