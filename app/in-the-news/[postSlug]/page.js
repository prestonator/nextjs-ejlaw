import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { PostBySlug } from "@/queries/postBySlug.graphql";
import { PostData } from "@/queries/allPosts.graphql";

const getPage = async (postSlug, slug) => {
	try {
		const { data } = await fetchData(PostData.loc.source.body, {
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

export async function generateStaticParams() {
	const { data } = await fetchData(PostBySlug.loc.source.body);
	const NewsBlogPostData = data?.newsBlogPosts?.data ?? [];
	return NewsBlogPostData.map((page) => ({
		slug: page.attributes.news_blog_page.data.attributes.slug,
		postSlug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const { postSlug, slug } = params;
	const { title, hero, image, team_member, category, date, sections } =
		(await getPage(postSlug, slug)) || {};
	return (
		<main>
			<section>
				<div>{SafeImage(image.data, styles.image)}</div>
				<div>
					<div>{SafeImage(team_member.data.attributes.image.data, styles.image)}</div>
					<p>Written by <strong>{team_member.data.attributes.title}</strong></p>
					<div>{SafeHtml(team_member.data.attributes.shortBio)}</div>
					<div>{category.data.attributes.title}</div>
                    <span>{date}</span>
				</div>
			</section>
            <section>
                <div>{SafeHtml(sections)}</div>
            </section>
		</main>
	);
};

export default Page;
