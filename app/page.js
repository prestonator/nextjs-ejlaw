import {
	SafeImage,
	SafeHtml,
	IconComponent,
	SafeImageUrl,
	SafeImageAlt,
} from "@/utils/helperFunctions";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { HomeQuery } from "@/queries/home.graphql";
import Button from "@/components/Buttons/MainButton/Button";
import StaffPreview from "@/components/StaffPreview/staffPreview";
import ServiceCard from "@/components/Cards/ServiceCard/ServiceCard";

const getData = async () => {
	const { data } = await fetchData(HomeQuery.loc.source.body);
	return data?.home?.data?.attributes;
};

export async function generateMetadata() {
	const { meta } = await getData();
	return {
		title: meta?.metaTitle || "Home | Elton Jenkins Law, P.L.L.C.",
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

const Home = async () => {
	const {
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
				<div className={styles.heading}>{SafeHtml(staffPreviewHeading)}</div>
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
			{/* Why Choose Us Section */}
			<section className={styles.whyChoose}>
				<div className={styles.services}>
					<div className={styles.heading}>{SafeHtml(whyUsHeading)}</div>
					<ul className={styles.serviceGrid}>
						{whyUsCards.map((card) => (
							<ServiceCard
								key={card.id}
								icon={card.icon}
								content={card.richText}
								button={card.button}
							/>
						))}
					</ul>
				</div>
			</section>
		</main>
	);
};

export default Home;
