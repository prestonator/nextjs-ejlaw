import React from "react";
import Link from "next/link";
import { SafeImage } from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";

const SectionFive = ({ section_five_header, staff_cards }) => {
	return (
		<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
					{section_five_header}
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{staff_cards.map((staff) => (
						<div
							key={staff.id}
							className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center transition-all duration-300 hover:border-gold/30 hover:shadow-xl hover:-translate-y-1 animate-scaleIn group flex flex-col items-center"
						>
							<div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-gold/20 transition-colors duration-300">
								{SafeImage(
									staff.avatar.data,
									"object-cover [overflow-clip-margin:unset]"
								)}
							</div>
							<h3 className="font-fancy text-2xl font-bold text-gray-900 mb-2">
								{staff.name}
							</h3>
							<p className="text-gray-600 font-medium mb-6">{staff.title}</p>
							<Button
								variant="outline"
								className="mt-auto w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
								asChild
							>
								<Link href={staff.href}>View Profile</Link>
							</Button>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<Button className="font-special text-lg" size="lg" asChild>
						<Link href="/contact">Experience the Difference</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionFive;
