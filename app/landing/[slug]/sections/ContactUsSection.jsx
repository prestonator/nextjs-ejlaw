import React from "react";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import Image from "next/image";

const ContactUsSection = ({ mapsUrl }) => {
	return (
		<section className="bg-gray-100 pt-16 pb-36 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="font-fancy text-3xl font-bold text-gray-900 mb-8">
					Contact Us
				</h2>
				<div className="bg-white rounded-lg p-8 mb-8 transition-all duration-300 hover:shadow-lg animate-scaleIn">
					<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-4">
						Elton Jenkins Law, P.L.L.C.
					</h3>
					<p className="text-gray-700 mb-2">
						124 E Main Street, Norman, OK 73069
					</p>
					<div className="flex justify-center space-x-4 mb-4 flex-wrap">
						<a href="tel:4052173623">
							<Button
								variant="link"
								className="text-primary font-special !cursor-pointer"
							>
								{IconComponent({
									icon: "HiOutlinePhone",
									customClassName: "mr-2 h-5 w-5",
								})}
								(405) 217-3623
							</Button>
						</a>
						<a href="mailto:susan@eltonjenkinslaw.com">
							<Button
								variant="link"
								className="text-primary font-special !cursor-pointer"
							>
								{IconComponent({
									icon: "HiOutlineMail",
									customClassName: "mr-2 h-5 w-5",
								})}
								susan@eltonjenkinslaw.com
							</Button>
						</a>
					</div>
				</div>
				<div className="aspect-w-16 aspect-h-9">
					<Image
						src={mapsUrl}
						alt="Map showing the location of Elton Jenkins Law"
						width={600}
						height={300}
						className="rounded-lg shadow-lg object-contain"
					/>
				</div>
			</div>
		</section>
	);
};

export default ContactUsSection;
