import {
	SafeImage,
	SafeImageUrl,
	SafeImageAlt,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import styles from "./OurTeam.module.css";
import { fetchData } from "@/lib/fetchData";
import { OurTeamsBySlug } from "@/queries/ourTeamBySlug.graphql";
import { OurTeams } from "@/queries/ourTeam.graphql";
import TabContainer from "./TabContainer";
import { ScrollArea } from "@/components/ui/scroll-area";

const getPage = async (slug) => {
	try {
		const { data } = await fetchData(OurTeams.loc.source.body, {
			filters: {
				slug: {
					eq: slug,
				},
			},
		});
		const { attributes } = data?.ourTeams?.data?.[0] ?? {};
		return attributes;
	} catch (error) {
		console.error("Error fetching team data:", error);
		return null;
	}
};

export async function generateMetadata({ params }) {
	const { meta } = await getPage(params.slug);
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

export async function generateStaticParams() {
	const { data } = await fetchData(OurTeamsBySlug.loc.source.body);
	const OurTeamPageData = data?.ourTeams?.data ?? [];
	return OurTeamPageData.map((page) => ({
		slug: page.attributes.slug,
	}));
}

const Page = async ({ params }) => {
	const { title, slug, team_member, tabContainer } = await getPage(params.slug);

	const tabs = tabContainer?.tab.map((tab) => ({
		id: tab.id,
		title: tab.tabHeading,
		content: tab.tabContent,
	}));

	// Create an array of <span> elements with the formatted position names
	const positionSpans = team_member?.data?.attributes?.positions.map((item) => (
		<span key={item.id}>{item.text}</span>
	));
	return (
		<main className={styles.ourTeamContainer}>
			<section className={styles.authorInfo}>
				<div className={`${styles.infoColumn} ${styles.headshotWrapper}`}>
					{SafeImage(
						team_member.data.attributes.image.data,
						styles.image,
						"(min-width: 860px) calc(24.44vw + 111px), calc(35.74vw + 174px)"
					)}
				</div>
				<div className={`${styles.infoColumn} ${styles.authorDetails}`}>
					<div className={styles.authorInfoTitle}>
						<h1 className={styles.authorTitle}>{title}</h1>
						<div className={styles.authorPositions}>
							{positionSpans.reduce((positions, position, index) => {
								positions.push(position);
								if (index < positionSpans.length - 1) {
									positions.push(
										IconComponent({
											icon: "RxDividerVertical",
											customClassName: styles.positionDivider,
										})
									);
								}
								return positions;
							}, [])}
						</div>
					</div>
					<div className={styles.authorContact}>
						<p className={styles.phone}>
							<a href={`tel:${team_member.data.attributes.phone}`}>
								{team_member.data.attributes.phone}
							</a>
						</p>
						<p className={styles.email}>
							<a href={`mailto:${team_member.data.attributes.email}`}>
								{team_member.data.attributes.email}
							</a>
						</p>
					</div>
					<div className={`sm:block hidden ${styles.authorBio}`}>
						{SafeHtml(team_member.data.attributes.longBio)}
					</div>
					<ScrollArea
						className={`${styles.bioScroll} sm:hidden text-center font-body bg-white h-[150px] border`}
					>
						{SafeHtml(team_member.data.attributes.longBio)}
					</ScrollArea>
				</div>
			</section>
			<section className={styles.authorTabs}>
				<TabContainer tabs={tabs} tab={1} />
			</section>
		</main>
	);
};

export default Page;
