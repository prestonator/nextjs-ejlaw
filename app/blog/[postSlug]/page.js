import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	formatDate,
	SafeImageAlt,
} from "@/utils/helperFunctions";
import JsonLd from "@/components/Seo/jsonLD";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import PostBySlug from "@/queries/postBySlug.graphql";
import PostData from "@/queries/allPosts.graphql";

const getPage = async (postSlug, slug) => {
	try {
		const { data } = await fetchData(PostData, {
			filters: {
				slug: {
					endsWith: postSlug,
				},
				news_blog_page: {
					slug: {
						eq: slug,
					},
				},
			},
		});
		const { attributes } = data?.newsBlogPosts?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching Page data:", error);
		return null;
	}
};

export async function generateMetadata({ params }) {
	const awaitedParams = await params;
	const { meta } = await getPage(awaitedParams.postSlug, awaitedParams.slug);
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
	const { data } = await fetchData(PostBySlug);
	const NewsBlogPostData = data?.newsBlogPosts?.data ?? [];
	return NewsBlogPostData.map((page) => ({
		slug: page.attributes.news_blog_page.data.attributes.slug,
		postSlug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const awaitedParams = await params;
	const { postSlug, slug } = awaitedParams;
	const { title, image, team_member, category, date, sections, meta } =
		(await getPage(postSlug, slug)) || {};
	return (
		<main>
			<JsonLd jsonLd={meta?.jsonLD} />
			{/* Hero section */}
			<section className={styles.heroSection}>
				<div className={styles.textContainer}>
					<h1 className={styles.postTitle}>{title}</h1>
				</div>
				<div className={styles.heroContent}>
					{/* Image */}
					<div className={`${styles.heroImageWrapper} ${styles.imageWrapper}`}>
						{SafeImage(image.data, styles.image)}
					</div>
					{/* Blog post info */}
					<div className={styles.infoContainer}>
						{/* Author info */}
						<div className={`${styles.heroRow} ${styles.authorInfo}`}>
							<div className={styles.iconWrapper}>
								<div className={`${styles.imageWrapper}`}>
									{SafeImage(
										team_member.data.attributes.image.data,
										styles.image
									)}
								</div>
							</div>
							<div className={`${styles.contentCol} ${styles.authorMeta}`}>
								<div>
									<span>Written by </span>
									<Link href={`/our-team/${team_member.data.attributes.slug}`}>
										{team_member.data.attributes.title}
									</Link>
								</div>
								{SafeHtml(team_member.data.attributes.shortBio)}
							</div>
						</div>
						{/* Categories */}
						<div className={`${styles.heroRow} ${styles.categoryInfo}`}>
							<div className={`${styles.contentCol} ${styles.categoryMeta}`}>
								<div className={styles.category}>
									{category.data.attributes.title}
								</div>
							</div>
						</div>
						{/* Date */}
						<div className={`${styles.heroRow} ${styles.dateInfo}`}>
							<div className={`${styles.contentCol} ${styles.dateMeta}`}>
								{SafeHtml(formatDate(date))}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className={styles.contentSection}>
				<div className={styles.contentContainer}>{SafeHtml(sections)}</div>
			</section>
		</main>
	);
};

export default Page;
