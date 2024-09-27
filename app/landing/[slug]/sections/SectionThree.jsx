import React from "react";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/utils/helperFunctions";

const SectionThree = ({ section_three_header, reasons_card }) => {
	return (
		<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
					{section_three_header}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{reasons_card.map((item) => (
						<div
							key={item.id}
							className="bg-white rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl group animate-scaleIn"
						>
							<div className="relative border-2 border-solid border-gold z-10 bg-transparent text-gold rounded-full p-4 mx-auto mb-6 w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-primary/50 group-hover:scale-105">
								{IconComponent({
									icon: item.icon,
									customClassName: "h-10 w-10",
								})}
							</div>
							<h3 className="font-fancy text-2xl font-semibold text-gray-800 mb-3 transition-colors duration-300 group-hover:text-black">
								{item.header}
							</h3>
							<p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
								{item.content}
							</p>
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SectionThree;
