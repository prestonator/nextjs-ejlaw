import {
	SafeImage,
	SafeImageUrl,
	SafeImageAlt,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import { fetchData } from "@/lib/fetchData";
import { LandingPagesBySlug } from "@/queries/landingPageBySlug.graphql";
import { LandingPageData } from "@/queries/landingPageData.graphql";
import LandingPageForm from "@/components/LandingPage/ContactForm/ContactForm";
import { Button } from "@/components/ui/button";

const getPage = async (slug) => {
	try {
		const { data } = await fetchData(LandingPageData.loc.source.body, {
			filters: {
				slug: {
					eq: slug,
				},
			},
		});
		const { attributes } = data?.landingPages?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching team data:", error);
		return null;
	}
};

export async function generateStaticParams() {
	const { data } = await fetchData(LandingPagesBySlug.loc.source.body);
	const LandingData = data?.landingPages?.data ?? [];
	return LandingData.map((page) => ({
		slug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const {
		title,
		slug,
		landing_page_hero,
		section_one_header,
		section_one_card,
		section_one_content,
		section_one_button,
		section_two_header,
		services_card,
		section_three_header,
		reasons_card,
	} = await getPage(params.slug);

	//console.log(services_card);
	return (
		<div className="flex flex-col min-h-screen font-body">
			<section className="relative bg-gray-900 text-white animate-fadeIn">
				<div
					className={`absolute inset-0 bg-[url('https://ej-law-space.sfo3.cdn.digitaloceanspaces.com/uploads/3e513387e27b2c5cac7f3b2e2846027d.webp')] bg-cover bg-top opacity-20`}
				></div>
				<div className="relative mx-auto max-w-screen-xl px-4 pb-16 pt-48 sm:px-6 md:flex md:items-center md:px-8">
					<div className="md:flex md:items-center md:justify-evenly w-full">
						<div className="max-w-xl mx-auto md:mx-0">
							<h1 className="font-fancy text-3xl font-extrabold sm:text-5xl md:text-6xl animate-slideRight">
								{landing_page_hero.header}
								<strong className="block font-extrabold text-[#edbb5f] mt-2">
									{landing_page_hero.subheader}
								</strong>
							</h1>
							<p className="mt-4 max-w-lg text-xl sm:text-2xl animate-slideRight">
								{landing_page_hero.description}
							</p>

							<div className="mt-8 flex flex-wrap gap-4 animate-slideRight">
								{landing_page_hero.heroButton.map((button) => {
									return (
										<Button
											key={button.id}
											className={`w-full sm:w-auto flex items-center justify-center gap-2 font-special text-lg ${
												button.id === 2
													? 'variant="outline" bg-white text-gray-900'
													: ""
											}`}
											size="lg"
											href={button.href}
										>
											{IconComponent({
												icon: button.icon,
											})}
											<span>{button.label}</span>
										</Button>
									);
								})}
							</div>
						</div>

						<div
							className="mt-8 mx-auto md:mx-0 w-3/4 md:mt-0 md:w-1/2 md:max-w-md animate-scaleIn"
							id="contact-form"
						>
							<LandingPageForm />
						</div>
					</div>
				</div>
			</section>
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
						<Button
							className="font-special text-lg"
							size="lg"
							href="#contact-form"
						>
							{section_one_button}
						</Button>
					</div>
				</div>
			</section>
			<section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 animate-slideUp">
				<div className="max-w-6xl mx-auto">
					<h2 className="font-fancy text-3xl font-bold text-center text-gray-900 mb-12">
						{section_two_header}
					</h2>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{services_card.map((service) => (
							<div
								key={service.id}
								className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-scaleIn"
							>
								<div className="flex items-center mb-6">
									{IconComponent({
										icon: service.services_card_header.icon,
										customClassName: "h-10 w-10 text-primary mr-4",
									})}
									<h3 className="font-fancy text-2xl font-semibold text-gray-900">
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
						<Button className="font-special text-lg" size="lg">
							Discuss Your Case With Us
						</Button>
					</div>
				</div>
			</section>
			<section className="bg-white py-16 lg:px-8 animate-slideUp">
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
									<IconComponent
										icon={item.icon}
										customClassName="h-12 w-12 text-primary"
									/>
								</div>
								<h3 className="font-fancy text-xl font-semibold text-gray-900 mb-2">
									{item.header}
								</h3>
								<p className="text-gray-700">{item.content}</p>
							</div>
						))}
					</div>
					<div className="text-center mt-12">
						<Button className="font-special text-lg" size="lg">
							Experience the Elton Jenkins Law Difference
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Page;
