import {
	SafeImage,
	SafeHtml,
	IconComponent,
	SafeImageUrl,
} from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { AboutQuery } from "@/queries/about.graphql";
import TextCard from "@/components/Cards/TextCard/TextCard";
import IconCard from "@/components/Cards/IconCard/IconCard";
import Button from "@/components/Buttons/MainButton/Button";

const getData = async () => {
	const { data } = await fetchData(AboutQuery.loc.source.body);
	return data?.aboutPage?.data?.attributes;
};

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
					{SafeImage(hero?.image?.data)}
				</div>
				<div className={styles.textContent}>{SafeHtml(hero?.richText)}</div>
			</section>
			<section className={styles.callToAction}>
				<div className={styles.textContent}>{SafeHtml(cta?.richText)}</div>
				<div className={styles.imageWrapper}>{SafeImage(cta?.image?.data)}</div>
			</section>
			<section className={styles.ourServices}>
				<div className={styles.textContent}>
					{SafeHtml(practiceAreaHeading)}
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
