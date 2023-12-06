import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { ContactPageQuery } from "@/queries/contact.graphql";

const getData = async () => {
	const { data } = await fetchData(ContactPageQuery.loc.source.body);
	return data?.contact?.data?.attributes;
};

const ContactPage = async () => {
	const { title, slug, details, cta, socials } = await getData();
	return (
		<main>
			<section>
				<div>
					<h1>Contact Us Today!</h1>
				</div>
				<div>
					<div>form</div>
					<div>
						{details?.map((detail) => (
							<div key={detail.id}>
								{IconComponent({
									icon: detail.icon,
									customClassName: styles.icon,
								})}
								<div>{SafeHtml(detail.richText)}</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section>
				<div>
					{SafeHtml(cta?.richText)}
					<button>
						<Link href={cta?.button?.href}>{cta?.button.label}</Link>
					</button>
				</div>
				<div>
					{IconComponent({
						icon: cta?.icon,
						customClassName: styles.icon,
					})}
				</div>
			</section>
			<section>
				<div>
					{socials.icon.map((item) =>
						IconComponent({
							icon: item.icon,
							customClassName: styles.icon,
							href: item.href,
							key: item.id,
						})
					)}
				</div>
				<div>{SafeHtml(socials?.richText)}</div>
			</section>
		</main>
	);
};

export default ContactPage;
