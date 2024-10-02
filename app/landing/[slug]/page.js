import {
	SafeImageUrl,
	SafeImageAlt,
} from "@/utils/helperFunctions";
import { fetchData } from "@/lib/fetchData";
import { LandingPagesBySlug } from "@/queries/landingPageBySlug.graphql";
import { LandingPageData } from "@/queries/landingPageData.graphql";
import LandingHero from "./sections/LandingHero";
import SectionOne from "./sections/SectionOne";
import SectionTwo from "./sections/SectionTwo";
import SectionThree from "./sections/SectionThree";
import SectionFour from "./sections/SectionFour";
import SectionFive from "./sections/SectionFive";
import ContactUsSection from "./sections/ContactUsSection";

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

export async function generateMetadata({ params }) {
	const awaitedParams = await params;
	const { meta } = await getPage(awaitedParams.slug);
	return {
		title: meta?.metaTitle,
		description: meta?.metaDescription,
		alternates: {
			canonical: meta?.canonical,
		},
		openGraph: {
			title: meta?.ogTitle || "",
			description: meta?.ogDescription || "",
			url: meta?.ogUrl || "",
			type: meta?.ogType || "",
			images: [
				{
					url: SafeImageUrl(meta?.ogImage?.data),
					width: 1200,
					height: 630,
					alt: SafeImageAlt(meta?.ogImage?.data),
				},
			],
		},
		twitter: {
			card: meta?.twitterCard || "",
		},
	};
}


export async function generateStaticParams() {
	const { data } = await fetchData(LandingPagesBySlug.loc.source.body);
	const LandingData = data?.landingPages?.data ?? [];
	return LandingData.map((page) => ({
		slug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const awaitedParams = await params;
	const data = await getPage(awaitedParams.slug);
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const mapsUrl = `https://maps.googleapis.com/maps/api/staticmap?center=124+E+Main+St,Norman,OK&zoom=15&size=600x300&key=${apiKey}`;

	return (
		<div className="flex flex-col min-h-screen font-body">
			<LandingHero landing_page_hero={data.landing_page_hero} />
			<SectionOne
				section_one_header={data.section_one_header}
				section_one_card={data.section_one_card}
				section_one_content={data.section_one_content}
				section_one_button={data.section_one_button}
			/>
			<SectionTwo
				section_two_header={data.section_two_header}
				services_card={data.services_card}
			/>
			<SectionThree
				section_three_header={data.section_three_header}
				reasons_card={data.reasons_card}
			/>
			<SectionFour
				section_four_header={data.section_four_header}
				testimonial={data.testimonial}
			/>
			<SectionFive
				section_five_header={data.section_five_header}
				staff_cards={data.staff_cards}
			/>
			<ContactUsSection mapsUrl={mapsUrl} />
		</div>
	);
};

export default Page;
