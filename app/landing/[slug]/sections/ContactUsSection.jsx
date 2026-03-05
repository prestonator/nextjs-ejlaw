import React from "react";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/RenderIcon";
import Image from "next/image";

const ContactUsSection = ({ mapsUrl }) => {
	return (
		<section className="bg-gray-100 pt-16 pb-36 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="font-fancy text-3xl font-bold text-gray-900">
						Visit Our Office
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
						We are conveniently located in downtown Norman.
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch bg-white rounded-2xl shadow-xl overflow-hidden animate-scaleIn">
					<div className="p-10 lg:p-12 flex flex-col justify-center h-full bg-white relative z-10">
						<h3 className="font-fancy text-2xl font-bold text-gray-900 mb-2">
							Elton Jenkins Law, P.L.L.C.
						</h3>
						<p className="text-gray-600 mb-8 text-lg flex items-center">
							{IconComponent({
								icon: "FaMapMarkerAlt",
								customClassName: "mr-3 h-5 w-5 text-gold",
							})}
							124 E Main Street, Norman, OK 73069
						</p>
						<div className="space-y-4">
							<a href="tel:4052173623" className="block group">
								<div className="flex items-center p-4 rounded-xl border border-gray-100 transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gray-50 group-hover:shadow-md cursor-pointer">
									<div className="flex-shrink-0 bg-primary/5 p-3 rounded-full mr-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
										{IconComponent({
											icon: "HiOutlinePhone",
											customClassName: "h-6 w-6",
										})}
									</div>
									<div>
										<p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone</p>
										<p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">(405) 217-3623</p>
									</div>
								</div>
							</a>
							<a href="mailto:susan@eltonjenkinslaw.com" className="block group">
								<div className="flex items-center p-4 rounded-xl border border-gray-100 transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gray-50 group-hover:shadow-md cursor-pointer">
									<div className="flex-shrink-0 bg-primary/5 p-3 rounded-full mr-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
										{IconComponent({
											icon: "HiOutlineMail",
											customClassName: "h-6 w-6",
										})}
									</div>
									<div>
										<p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</p>
										<p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 break-all">susan@eltonjenkinslaw.com</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div className="h-full min-h-[400px] w-full relative">
						<Image
							src={mapsUrl}
							alt="Map showing the location of Elton Jenkins Law"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactUsSection;
