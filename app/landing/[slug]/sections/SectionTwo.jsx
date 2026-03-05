import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconComponent } from "@/utils/helperFunctions";

const SectionTwo = ({ section_two_header, services_card, title }) => {
	return (
		<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
			<div className="max-w-6xl mx-auto">
				<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
					{section_two_header}
				</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{services_card.map((service) => (
						<div
							key={service.id}
							className="bg-white rounded-xl border border-gray-100 shadow-md p-8 transition-all duration-300 hover:shadow-xl hover:border-gold/30 hover:-translate-y-1 animate-scaleIn"
						>
							<div className="flex items-center mb-6">
								<div className="flex-shrink-0 bg-primary/5 p-3 rounded-full mr-4 text-primary">
									{IconComponent({
										icon: service.services_card_header.icon,
										customClassName: "h-8 w-8",
									})}
								</div>
								<h3 className="font-fancy text-2xl font-bold text-gray-900 leading-tight">
									{service.services_card_header.content}
								</h3>
							</div>
							<p className="text-gray-700 mb-6">
								{service.services_card_description}
							</p>
							<ul className="space-y-4">
								{service.services_card_content.map((feature) => (
									<li key={feature.id} className="flex items-center">
										{IconComponent({
											icon: feature.icon,
											customClassName: "h-6 w-6 text-primary mr-2",
										})}
										<span className="text-gray-700">{feature.content}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="text-center mt-12">
					<Button asChild className="font-special text-lg" size="lg">
						<Link href="#contact-form">Get Help with {title}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default SectionTwo;
