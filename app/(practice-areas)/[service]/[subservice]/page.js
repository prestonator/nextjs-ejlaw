import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import Link from "next/link";
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

const Page = async ({ params }) => {
	const { subservice } = params;
	const { title, slug, hero, sections } =
		(await getPage(subservice)) || {};
	return (
		<main>
			<section
				style={{
					backgroundImage: `url(${SafeImageUrl(hero?.image?.data)})`,
					backgroundSize: "cover",
				}}
			>
				<div>{SafeHtml(hero?.richText)}</div>
			</section>
			<section>{SafeHtml(sections)}</section>
		</main>
	);
};

export default Page;
