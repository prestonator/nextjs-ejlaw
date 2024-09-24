import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconComponent } from "@/utils/helperFunctions";

const SectionOne = ({
	section_one_header,
	section_one_card,
	section_one_content,
	section_one_button,
}) => {
	return (
		<section className="bg-white py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-4xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-gray-900 mb-8 text-center">
					{section_one_header}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{section_one_card.map((item) => (
						<div
							key={item.id}
							className="flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-md animate-scaleIn"
						>
							{IconComponent({
								icon: item.icon,
								customClassName: "h-12 w-12 text-primary mb-4",
							})}
							<h3 className="font-fancy text-xl font-semibold mb-2">
								{item.header}
							</h3>
							<p className="text-gray-600">{item.content}</p>
						</div>
					))}
				</div>
				<div className="text-center space-y-6">
					{section_one_content.map((item) => (
						<p key={item.id} className="text-lg text-gray-700">
							{item.text}
						</p>
					))}
					<Button className="font-special text-sm px-4 sm:text-lg sm:px-8" size="lg" asChild>
						<Link href="#contact-form">{section_one_button}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionOne;
