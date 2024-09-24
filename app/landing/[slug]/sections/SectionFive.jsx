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
							className="bg-gray-100 rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-white hover:shadow-xl animate-scaleIn group"
						>
							<div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-clip">
								{SafeImage(
									staff.avatar.data,
									"object-cover [overflow-clip-margin:unset]"
								)}
							</div>
							<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
								{staff.name}
							</h3>
							<p className="text-gray-600">{staff.title}</p>
							<Button
								variant="outline"
								className="mt-4 w-1/2 group-hover:bg-primary group-hover:text-white transition-all duration-300"
								asChild
							>
								<Link href={staff.href}>View Profile</Link>
							</Button>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<Button className="font-special text-lg" size="lg" asChild>
						<Link href="/contact">
							Experience the Elton Jenkins Law Difference
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionFive;
