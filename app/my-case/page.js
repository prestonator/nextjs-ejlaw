import {
	SafeImage,
	SafeHtml,
	IconComponent,
	SafeImageUrl,
	SafeImageAlt,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { MyCaseQuery } from "@/queries/mycase.graphql";
import Button from "@/components/Buttons/MainButton/Button";

const getData = async () => {
	const { data } = await fetchData(MyCaseQuery.loc.source.body);
	return data?.mycase?.data?.attributes;
};

export async function generateMetadata() {
	const { meta } = await getData();
	return {
		title: meta?.metaTitle || "MyCase",
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

const MyCasePage = async () => {
	const { title, slug, hero, sections } = await getData();
	return (
		<main className={styles.main}>
			<section className={`md:flex-row flex-col ${styles.heroSection}`}>
				<div
					className={`w-full md:w-[var(--size-100)] ${styles.imageButtonWrapper}`}
				>
					<div className={styles.imageWrapper}>
						{SafeImage(
							hero?.image?.data,
							styles.image,
							"(min-width: 1860px) calc(35.7vw + 173px), 45.45vw"
						)}
					</div>
					<div className={styles.buttonWrapper}>
						<Button href={hero?.buttons[0]?.href}>
							{hero?.buttons[0]?.label}
						</Button>
					</div>
				</div>
				<div className={`w-unset mx-16 md:w-[var(--size-100)] ${styles.heroText}`}>
					{SafeHtml(hero?.richText)}
				</div>
			</section>
			<section className={`mx-16 ${styles.contentSection}`}>
				<div className={styles.contentWrapper}>{SafeHtml(sections)}</div>
			</section>
		</main>
	);
};

export default MyCasePage;
