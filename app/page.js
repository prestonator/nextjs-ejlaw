import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { HomeQuery } from "@/queries/home.graphql";

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
		<main>
			<section>
				<div>
					<div>{SafeHtml(hero.richText)}</div>
					<div>
						{hero?.buttons?.map((button) => (
							<button key={button.id}>
								<Link href={button.href}>{button.label}</Link>
							</button>
						))}
					</div>
				</div>
				<div>{SafeImage(hero.image.data, styles.image)}</div>
			</section>
			<section>
				<div>
					<div>{SafeHtml(modal?.richText)}</div>
					<div>
						<button>
							<Link href={modal?.buttons[0]?.href}>
								{modal?.buttons[0]?.label}
							</Link>
						</button>
					</div>
				</div>
			</section>
			<section>
				<div>{SafeHtml(staffPreviewHeading)}</div>
				<div>
					{staffPreview?.map((staff) => (
						<div key={staff.id}>
							<div>
								<div>
									{staff.socialIcons.map(({ icon, href }) =>
										IconComponent({
											icon: icon,
											customClassName: styles.icon,
											href: href,
											key: icon,
										})
									)}
								</div>
								<div>{SafeImage(staff.image.data, styles.image)}</div>
							</div>
							<div>
								{SafeHtml(staff.richText)}
								<button>
									<Link href={staff?.button?.href}>{staff?.button?.label}</Link>
								</button>
							</div>
						</div>
					))}
				</div>
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
