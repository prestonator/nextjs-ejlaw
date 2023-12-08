import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { MyCaseQuery } from "@/queries/mycase.graphql";
import Button from "@/components/Buttons/MainButton/Button";

const getData = async () => {
	const { data } = await fetchData(MyCaseQuery.loc.source.body);
	return data?.mycase?.data?.attributes;
};

const MyCasePage = async () => {
	const { title, slug, hero, sections } = await getData();
	return (
		<main className={styles.main}>
			<section className={styles.heroSection}>
				<div className={styles.imageButtonWrapper}>
					<div className={styles.imageWrapper}>
						{SafeImage(hero?.image?.data, styles.image)}
					</div>
					<div className={styles.buttonWrapper}>
						<Button href={hero?.buttons[0]?.href}>
							{hero?.buttons[0]?.label}
						</Button>
					</div>
				</div>
				<div className={styles.heroText}>{SafeHtml(hero?.richText)}</div>
			</section>
			<section className={styles.contentSection}>
				<div className={styles.contentWrapper}>{SafeHtml(sections)}</div>
			</section>
		</main>
	);
};

export default MyCasePage;
