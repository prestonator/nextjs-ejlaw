import dynamic from "next/dynamic";
import {
	SafeImageUrl,
	SafeImageAlt,
	SafeHtml,
	SafeImage,
} from "@/utils/helperFunctions";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { PracticeAreaSlugs } from "@/queries/practiceAreaBySlug.graphql";
import { PracticeAreaData } from "@/queries/allPracticeAreas.graphql";
const ExpandCard = dynamic(
	() => import("@/components/Cards/ExpandCard/ExpandCard")
);

const getPage = async (service) => {
	try {
		const { data } = await fetchData(PracticeAreaData.loc.source.body, {
			filters: {
				slug: {
					eq: service,
				},
			},
		});
		const { attributes } = data?.mainPracticeAreas?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching Page data:", error);
		return null;
	}
};

export async function generateStaticParams() {
	const { data } = await fetchData(PracticeAreaSlugs.loc.source.body);
	const PracticeAreaPageData = data?.mainPracticeAreas?.data ?? [];
	return PracticeAreaPageData.map((page) => ({
		service: page.attributes.slug,
	}));
}

export async function generateMetadata({ params }) {
	const meta = (await getPage(params.service))?.meta || {};
	return {
		title: meta?.metaTitle || "",
		description: meta?.metaDescription || "",
		alternates: {
			canonical: meta?.canonical || "",
		},
		openGraph: {
			title: meta?.ogTitle || "",
			description: meta?.ogDescription || "",
			url: meta?.ogUrl || "",
			type: meta?.ogType || "",
			images: [
				{
					url: SafeImageUrl(meta?.ogImage?.data) || "",
					width: 1200 || "",
					height: 630 || "",
					alt: SafeImageAlt(meta?.ogImage?.data) || "",
				},
			],
		},
		twitter: {
			card: meta?.twitterCard || "",
		},
	};
}

const Page = async ({ params }) => {
	const { title, slug, hero, sections, sub_practice_areas } =
		(await getPage(params.service)) || {};
	return (
		<main>
			{/* Hero section */}
			<section className="pt-[var(--size-15)]">
				<div className="relative w-full h-[50vh]">
					{SafeImage(hero?.image?.data, "object-cover", "100vw", "eager")}
					<div className="absolute top-0 left-0 w-full h-full z-[1] bg-opacity-60 bg-black"></div>
					<div
						className={`${styles.heroTextContainer} absolute left-[var(--size-15)] top-[var(--size-10)] z-[2] text-white`}
					>
						{SafeHtml(hero?.richText)}
					</div>
				</div>
			</section>
			{/* Information section */}
			<section className={styles.infoSections}>
				<div className={styles.infoSectionWrapper}>{SafeHtml(sections)}</div>
			</section>
			{/* Flip card section */}
			{sub_practice_areas && (
				<section className={styles.flipCardSection}>
					{sub_practice_areas.data.map((card, cardIndex) => (
						<ExpandCard
							key={card.attributes.cardContent.id}
							title={card.attributes.cardContent.cardTitle}
							image={SafeImageUrl(card.attributes.cardContent.image.data)}
							content={card.attributes.cardContent.cardBody}
							href={`${slug}/${card.attributes.slug}`}
							isFirst={cardIndex === 0}
						/>
					))}
				</section>
			)}
		</main>
	);
};

export default Page;
