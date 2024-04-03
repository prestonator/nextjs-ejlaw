import React from "react";
import Image from "next/image";

const Map = () => {
	const mapUrl = process.env.CONTACT_PAGE_MAP_URL;

	return (
		<div className="relative">
			<Image src={mapUrl} alt="Map" className="object-cover" fill sizes="100vw" />
		</div>
	);
};

export default Map;