import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import ExpandCard from "@/components/Cards/ExpandCard/ExpandCard";
import { fetchData } from "@/lib/fetchData";
import { PracticeAreaSlugs } from "@/queries/practiceAreaBySlug.graphql";
import { PracticeAreaData } from "@/queries/allPracticeAreas.graphql";

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

const Page = async ({ params }) => {
	const { title, slug, hero, sections, sub_practice_areas } =
		(await getPage(params.service)) || {};
	return (
		<main>
			{/* Hero section */}
			<section
				className={styles.heroSection}
				style={{
					backgroundImage: `url(${SafeImageUrl(hero?.image?.data)})`,
					backgroundSize: "cover",
				}}
			>
				<div className={styles.heroTextContainer}>
					{SafeHtml(hero?.richText)}
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
