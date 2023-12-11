import * as ReactIcons from "@/lib/reactIcons";
import { sanitize } from "isomorphic-dompurify";
import parse from "html-react-parser";
import Image from "next/image";

export const SafeImage = (imageData, styles) => {
	const strapiMediaEndpoint = "https://strapi.eltonjenkinslaw.com";
	const url = encodeURI(imageData?.attributes?.url) ?? "";
	const alt = imageData?.attributes?.alternativeText ?? "";

	return (
		<Image src={strapiMediaEndpoint + url} alt={alt} fill className={styles} />
	);
};

export const SafeImageUrl = (imageData) => {
	const strapiMediaEndpoint = process.env.STRAPI_MEDIA_ENDPOINT;
	const url = encodeURI(imageData?.attributes?.url) ?? "";

	const full_url = strapiMediaEndpoint + url;

	return full_url;
};

export const SafeImageAlt = (imageData) => {
	const alt = imageData?.attributes?.name ?? "";

	return alt;
};

export const formatDate = (dateStr) => {
	const date = new Date(dateStr);
	const formattedDate = date.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	// Add day suffix (st, nd, rd, th)
	const dayOfMonth = date.getDate();
	const getDaySuffix = (day) => {
		if (day > 3 && day < 21) {
			return "th";
		}
		const lastDigit = day % 10;
		return ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][
			lastDigit
		];
	};
	const daySuffix = getDaySuffix(dayOfMonth);

	return formattedDate.replace(
		dayOfMonth,
		`${dayOfMonth}<sup>${daySuffix}</sup>`
	);
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
