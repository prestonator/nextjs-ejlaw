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
	const awaitedParams = await params;
	const { meta } = await getPage(awaitedParams.slug);
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
	const awaitedParams = await params;
	const { title, team_member, tabContainer } = await getPage(
		awaitedParams.slug
	);

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
		<main
			className={`animate-background-gradient bg-[length:400%_400%] bg-[linear-gradient(115deg,#fff_35%,#2b2b2b_35%)]`}
		>
			<section
				className={`pt-16 lg:pt-32 lg:px-48 gap-0 lg:gap-4 items-center flex flex-col lg:flex-row justify-center m-auto`}
			>
				<div className={`h-[40vw] w-[65vw] lg:w-[40vw] lg:h-[35rem] relative`}>
					{SafeImage(
						team_member.data.attributes.image.data,
						"object-contain object-bottom",
						"(min-width: 860px) calc(24.44vw + 111px), calc(35.74vw + 174px)"
					)}
				</div>
				<div className={`pb-12 lg:pb-0 lg:w-[50vw] w-auto`}>
					<div
						className={`py-4 w-full lg:w-[var(--size-75)] font-fancy items-center bg-white flex flex-col justify-center my-0 mx-auto`}
					>
						<h1 className={`text-5xl`}>{title}</h1>
						<div className="flex items-center text-xl">
							{positionSpans.reduce((positions, position, index) => {
								positions.push(position);
								if (index < positionSpans.length - 1) {
									positions.push(
										IconComponent({
											icon: "RxDividerVertical",
										})
									);
								}
								return positions;
							}, [])}
						</div>
					</div>
					<div
						className={`text-lg my-4 gap-4 animate-text-white-black flex flex-row justify-center mx-auto w-auto`}
					>
						<p className={`text-center`}>
							<a href={`tel:${team_member.data.attributes.phone}`}>
								{team_member.data.attributes.phone}
							</a>
						</p>
						<p className={`text-center`}>
							<a href={`mailto:${team_member.data.attributes.email}`}>
								{team_member.data.attributes.email}
							</a>
						</p>
					</div>
					<div
						className={`hidden sm:block bg-white lg:bg-transparent *:animate-text-black-white lg:px-0 px-16 py-6 lg:py-0 text-center font-body lg:*:animate-text-white-black text-lg md:text-xl *:mb-4`}
					>
						{SafeHtml(team_member.data.attributes.longBio)}
					</div>
					<ScrollArea
						className={`${styles.bioScroll} [&>div>div>p:first-of-type]:pt-4 [&>div>div>p:not(:last-child)]:mb-4 [&>div>div>p:last-child]:pb-4 block py-0 px-4 sm:hidden text-center font-body bg-white h-[150px] border`}
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
