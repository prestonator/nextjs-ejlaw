// JsonLd.js
import Script from "next/script";

export default function JsonLd({ jsonLd }) {
	return (
		<Script
			id="json-ld"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}
