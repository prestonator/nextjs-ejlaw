import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { HomeQuery } from "@/queries/home.graphql";
import Button from "@/components/Buttons/MainButton/Button";
import StaffPreview from "@/components/StaffPreview/staffPreview";

const getData = async () => {
	const { data } = await fetchData(HomeQuery.loc.source.body);
	return data?.home?.data?.attributes;
};

const Home = async () => {
	const {
		title,
		hero,
		modal,
		staffPreviewHeading,
		staffPreview,
		whyUsHeading,
		whyUsCards,
	} = await getData();
	return (
		<main className={styles.main}>
			{/* Hero section */}
			<section className={styles.hero}>
				<div className={styles.textContent}>
					{SafeHtml(hero.richText)}
					<div className={styles.button}>
						{hero?.buttons?.map((button) => (
							<Button key={button.id} href={button.href}>
								{button.label}
							</Button>
						))}
					</div>
				</div>
				{/* Image */}
				<div className={styles.imageWrapper}>
					{SafeImage(hero.image.data, styles.image)}
				</div>
			</section>
			{/* Call to Action Section */}
			<section className={`${styles.callToAction} ${styles.modalContainer}`}>
				<article className={styles.modal}>
					{SafeHtml(modal?.richText)}
					<Button href={modal?.buttons[0]?.href}>
						{modal?.buttons[0]?.label}
					</Button>
				</article>
			</section>
			{/* Our Team Section */}
			<section className={styles.staff}>
				<div>{SafeHtml(staffPreviewHeading)}</div>
				{/* Staff Preview */}
				{staffPreview?.map((staff, index) => (
					<StaffPreview
						key={staff.id}
						socialIcons={staff.socialIcons}
						avatarImage={staff.image.data}
						infoText={staff.richText}
						infoButton={staff.button}
						placement={staff.id % 2 === 0}
						index={index}
						totalItems="2"
					/>
				))}
			</section>
			<section>
				<div>{SafeHtml(whyUsHeading)}</div>
				<div>
					{whyUsCards.map((card) => (
						<div key={card?.id}>
							{IconComponent({
								icon: card?.icon,
								customClassName: styles.icon,
								key: card?.id,
							})}
							<div>{SafeHtml(card?.richText)}</div>
							<button>
								<Link href={card?.button?.href}>{card?.button?.label}</Link>
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default Home;
