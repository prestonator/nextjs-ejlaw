import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { NewsBlogBySlug } from "@/queries/postPageBySlug.graphql";
import { NewsBlogPages } from "@/queries/postpage.graphql";

const getPage = async (slug) => {
	try {
		const { data } = await fetchData(NewsBlogPages.loc.source.body, {
			filters: {
				slug: {
					eq: slug,
				},
			},
		});
		const { attributes } = data?.newsBlogPages?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching Page data:", error);
		return null;
	}
};

export async function generateStaticParams() {
	const { data } = await fetchData(NewsBlogBySlug.loc.source.body);
	const NewsBlogPageData = data?.newsBlogPages?.data ?? [];
	return NewsBlogPageData.map((page) => ({
		slug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const { title, slug, hero, news_blog_posts } =
		(await getPage(params.slug)) || {};
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
			<section>
				{news_blog_posts.data.map((post) => (
					<Link href={`${slug}/${post.attributes.slug}`} key={post.id}>
						<div>{SafeImage(post.attributes.image.data, styles.image)}</div>
						<div>
							<h4>{post.attributes.title}</h4>
							<span>{post.attributes.date}</span>
							<p>by {post.attributes.team_member.data.attributes.title}</p>
							<div>{SafeHtml(post.attributes.excerpt)}</div>
							<div>{post.attributes.category.data.attributes.title}</div>
						</div>
					</Link>
				))}
			</section>
		</main>
	);
};

export default Page;
