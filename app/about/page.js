import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { AboutQuery } from "@/queries/about.graphql";

const getData = async () => {
	const { data } = await fetchData(AboutQuery.loc.source.body);
	return data?.aboutPage?.data?.attributes;
};

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
	return (
		<main>
			<section>
				<div>{SafeImage(hero?.image?.data)}</div>
				<div>{SafeHtml(hero?.richText)}</div>
			</section>
			<section>
				<div>{SafeHtml(cta?.richText)}</div>
				<div>{SafeImage(cta?.image?.data)}</div>
			</section>
			<section>
				<div>{SafeHtml(practiceAreaHeading)}</div>
				{practiceAreaCards?.map((card) => (
					<Link href={card?.icon?.href} key={card?.id}>
						<div>
							{IconComponent({
								icon: card?.icon?.icon,
								customClassName: styles.icon,
							})}
						</div>
						<div>{SafeHtml(card?.richText)}</div>
					</Link>
				))}
			</section>
			<section>
				<div>{SafeImage(whyChooseUs?.image?.data)}</div>
				<div>{SafeHtml(whyChooseUs?.richText)}</div>
			</section>
			<section>
				<div>{SafeHtml(ourPhilosophyHeading)}</div>
				{ourPhilosophyCards?.map((card) => (
					<div key={card?.id}>{SafeHtml(card?.richText)}</div>
				))}
			</section>
			<section>
				<div>
					<div>{SafeHtml(contactSection?.richText)}</div>
					<button>
						<Link href={contactSection?.buttons[0]?.href}>
							{contactSection?.buttons[0]?.label}
						</Link>
					</button>
				</div>
			</section>
		</main>
	);
};

export default AboutPage;
