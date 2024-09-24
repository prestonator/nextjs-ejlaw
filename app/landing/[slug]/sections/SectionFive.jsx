import React from "react";

const SectionFive = ({ section_five_header, staff_cards }) => {
	return (
		<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
					{section_five_header}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{staff_cards.map((staff) => (
						<div
							key={staff.id}
							className="bg-gray-100 rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-xl animate-scaleIn"
						>
							<img
								src={staff.avatar.data.attributes.url}
								alt={staff.avatar.data.attributes.name}
								className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
							/>
							<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
								{staff.name}
							</h3>
							<p className="text-gray-600">{staff.title}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SectionFive;