import dynamic from "next/dynamic";
import {
	SafeImage,
	SafeHtml,
	SafeImageUrl,
	SafeImageAlt,
} from "@/utils/helperFunctions";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { AboutQuery } from "@/queries/about.graphql";
import Button from "@/components/Buttons/MainButton/Button";
const IconCard = dynamic(() => import("@/components/Cards/IconCard/IconCard"), {
	ssr: false,
});
const TextCard = dynamic(() => import("@/components/Cards/TextCard/TextCard"), {
	ssr: false,
});

const getData = async () => {
	const { data } = await fetchData(AboutQuery.loc.source.body);
	return data?.aboutPage?.data?.attributes;
};

export async function generateMetadata() {
	const { meta } = await getData();
	return {
		title: meta?.metaTitle || "About Us",
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

// Use destructuring assignment
const splitCardIntoRows = ({ practiceAreaCards }) => {
	const midPoint = Math.ceil(practiceAreaCards.length / 2);
	return [
		practiceAreaCards.slice(0, midPoint),
		practiceAreaCards.slice(midPoint),
	];
};

const renderIconCard = (contentArr) => (
	<>
		{contentArr.map((item) => (
			<IconCard key={item.id} content={item.richText} icon={item.icon} />
		))}
	</>
);

const renderTextCard = (contentArr) => (
	<>
		{contentArr.map((item) => (
			<TextCard key={item.id} content={item.richText} />
		))}
	</>
);

const AboutPage = async () => {
	const {
		title,
		slug,
		hero,
		cta,
		practiceAreaHeading,
		practiceAreaCards,
		whyChooseUs,
		ourPhilosophyHeading,
		ourPhilosophyCards,
		contactSection,
	} = await getData();

	const [firstRow, secondRow] = splitCardIntoRows({ practiceAreaCards });
	return (
		<main className={styles.container}>
			<section className={styles.hero}>
				<div className={styles.imageWrapper}>
					{SafeImage(
						hero?.image?.data,
						styles.image,
						"(min-width: 2840px) calc(41.88vw - 161px), (min-width: 780px) calc(37.79vw - 46px), (min-width: 640px) calc(53.33vw + 257px), calc(89.69vw + 31px)"
					)}
				</div>
				<div className={styles.textContent}>{SafeHtml(hero?.richText)}</div>
			</section>
			<section className={styles.callToAction}>
				<div className={styles.textContent}>{SafeHtml(cta?.richText)}</div>
				<div className={styles.imageWrapper}>
					{SafeImage(cta?.image?.data, styles.image, "calc(21.26vw + 110px)")}
				</div>
			</section>
			<section className={styles.ourServices}>
				<div className={styles.textContent}>
					<h3>{SafeHtml(practiceAreaHeading)}</h3>
					<hr />
				</div>
				<div className={styles.services}>{renderIconCard(firstRow)}</div>
				<div className={styles.services}>{renderIconCard(secondRow)}</div>
			</section>
			<section className={styles.whyChoose}>
				<div
					className={styles.image}
					style={{
						backgroundImage: `url(${SafeImageUrl(whyChooseUs?.image?.data)})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPositionY: "calc(-1 * var(--size-10))",
					}}
				></div>
				<div className={styles.textContent}>
					{SafeHtml(whyChooseUs?.richText)}
				</div>
			</section>
			<section className={styles.ourPhilosophy}>
				<div className={styles.textContent}>
					<h3>{SafeHtml(ourPhilosophyHeading)}</h3>
					<hr />
				</div>
				<div className={styles.services}>
					{renderTextCard(ourPhilosophyCards)}
				</div>
			</section>
			<section className={styles.contactDetails}>
				<div className={styles.textContent}>
					{SafeHtml(contactSection?.richText)}
				</div>
				<div className={styles.button}>
					<Button href={contactSection?.buttons[0]?.href}>
						{contactSection?.buttons[0]?.label}
					</Button>
				</div>
			</section>
		</main>
	);
};

export default AboutPage;
