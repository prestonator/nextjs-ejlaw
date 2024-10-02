import {
	SafeImage,
	SafeImageUrl,
	SafeImageAlt,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { SubPracticeBySlug } from "@/queries/subPracticeBySlug.graphql";
import { SubPracticeAreaData } from "@/queries/subPracticeData.graphql";

const getPage = async (subservice) => {
	try {
		const { data } = await fetchData(SubPracticeAreaData.loc.source.body, {
			filters: {
				slug: {
					eq: subservice,
				},
			},
		});
		const { attributes } = data?.subPracticeAreas?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching Page data:", error);
		return null;
	}
};

export async function generateStaticParams() {
	const { data } = await fetchData(SubPracticeBySlug.loc.source.body);
	const SubPracticeData = data?.subPracticeAreas?.data ?? [];
	return SubPracticeData.map((page) => ({
		subservice: page.attributes.slug,
	}));
}

export async function generateMetadata({ params }) {
	const awaitedParams = await params;
	const meta = (await getPage(awaitedParams.subservice))?.meta || {};
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

const Page = async ({ params }) => {
	const awaitedParams = await params;
	const { title, slug, hero, sections } =
		(await getPage(awaitedParams.subservice)) || {};
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
			<section className={styles.infoSections}>
				<div className={styles.infoSectionWrapper}>{SafeHtml(sections)}</div>
			</section>
		</main>
	);
};

export default Page;
