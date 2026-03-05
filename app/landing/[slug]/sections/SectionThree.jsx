import React from "react";
import { IconComponent } from "@/utils/RenderIcon";

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
							className="bg-white rounded-xl border border-gray-100 p-8 text-center transition-all duration-500 transform hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:border-gold/50 group animate-scaleIn relative overflow-hidden"
						>
							<div className="relative z-10 bg-gray-50 text-gold rounded-full p-4 mx-auto mb-6 w-20 h-20 flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
								{IconComponent({
									icon: item.icon,
									customClassName: "h-10 w-10",
								})}
							</div>
							<h3 className="relative z-10 font-fancy text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">
								{item.header}
							</h3>
							<p className="relative z-10 text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
								{item.content}
							</p>
							<div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SectionThree;
