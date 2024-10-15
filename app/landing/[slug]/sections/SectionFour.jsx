import React from "react";
import { IconComponent } from "@/utils/RenderIcon";

const SectionFour = ({ section_four_header, testimonial }) => {
	return (
		<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
					{section_four_header}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{testimonial.map((testimonial) => (
						<div
							key={testimonial.id}
							className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-scaleIn flex flex-col justify-between"
						>
							{IconComponent({
								icon: "FaQuoteLeft",
								customClassName: "h-8 w-8 text-primary mb-4",
							})}
							<p className="text-gray-700 mb-4">{testimonial.quote}</p>
							<div className="flex items-center">
								{IconComponent({
									icon: "IoMdPerson",
									customClassName: "w-6 h-6 p-2 bg-gray-300 rounded-full mr-4",
								})}
								<div>
									<h4 className="font-fancy font-semibold text-gray-900">
										{testimonial.name}
									</h4>
									<p className="text-gray-600">{testimonial.location}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SectionFour;