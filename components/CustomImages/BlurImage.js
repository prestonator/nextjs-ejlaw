import Image from "next/image";

const BlurImage = async (imageData, styles, sizes) => {
	const strapiMediaEndpoint = "https://strapi.eltonjenkinslaw.com";
	const url = encodeURI(imageData?.attributes?.url) ?? "";
	const alt = imageData?.attributes?.alternativeText ?? "";

	const imageUrl = strapiMediaEndpoint + url;


	return (
		<Image
			src={imageUrl}
			alt={alt}
			fill
			className={styles}
			sizes={sizes || ""}
			placeholder="blur"
		/>
	);
};

export default BlurImage;
