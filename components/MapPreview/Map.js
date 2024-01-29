import React from "react";
import Image from "next/image";
import mapImage from "@/public/localMap.webp";

const Map = () => {
	return <Image src={mapImage} alt="Map" className="object-cover" />;
};

export default Map;