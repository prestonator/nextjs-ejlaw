import {
	SafeImage,
	SafeImageUrl,
	SafeHtml,
	IconComponent,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./OurTeam.module.css";
import { fetchData } from "@/lib/fetchData";
import { OurTeamsBySlug } from "@/queries/OurTeamBySlug.graphql";
import { OurTeams } from "@/queries/ourTeam.graphql";
import TabContainer from "./TabContainer";

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
					{SafeImage(team_member.data.attributes.image.data, styles.image)}
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
					<div className={styles.authorBio}>
						{SafeHtml(team_member.data.attributes.longBio)}
					</div>
				</div>
			</section>
			<section className={styles.authorTabs}>
				<TabContainer tabs={tabs} tab={1} />
			</section>
		</main>
	);
};

export default Page;