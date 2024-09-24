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
							className="bg-gray-100 rounded-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-lg animate-scaleIn"
						>
							<div className="flex justify-center mb-4">
								{IconComponent({
									icon: item.icon,
									customClassName: "h-12 w-12 text-primary",
								})}
							</div>
							<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
								{item.header}
							</h3>
							<p className="text-gray-700">{item.content}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SectionThree;