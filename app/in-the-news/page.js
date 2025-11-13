import { SafeImageUrl, SafeImageAlt, SafeHtml } from "@/utils/helperFunctions";
import BlogCard from "@/components/Cards/BlogCard/BlogCard";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import NewsBlogBySlug from "@/queries/postPageBySlug.graphql";
import NewsBlogPages from "@/queries/postpage.graphql";

const getPage = async (slug) => {
  try {
    const { data } = await fetchData(NewsBlogPages, {
      filters: {
        slug: {
          eq: "in-the-news",
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

export async function generateMetadata() {
  const { meta } = await getPage();
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
  const { data } = await fetchData(NewsBlogBySlug);
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
      {/* Hero section */}
      <section
        className={styles.heroSection}
        style={{
          backgroundImage: `url(${SafeImageUrl(hero?.image?.data)})`,
          backgroundSize: "cover",
        }}
      >
        <div className={styles.textContainer}>{SafeHtml(hero?.richText)}</div>
      </section>
      {/* Blog Post Cards Section */}
      <section className={styles.blogCardSection}>
        <div className={styles.blogCardGrid}>
          {news_blog_posts?.data?.map((post) => {
            return (
              <BlogCard
                key={post.id}
                title={post.attributes.title}
                slug={`${slug}/${post.attributes.slug}`}
                author={post.attributes.team_member.data.attributes.title}
                date={post.attributes.date}
                excerpt={
                  post.attributes.excerpt.length > 200
                    ? post.attributes.excerpt.slice(0, 200) + "..."
                    : post.attributes.excerpt
                }
                image={post.attributes.image.data}
                categories={post.attributes.category.data.attributes.title}
              />
            );
          })}
        </div>
        <div></div>
      </section>
    </main>
  );
};

export default Page;
