import { SafeImage, SafeHtml, IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "./page.module.css";
import { fetchData } from "@/lib/fetchData";
import { MyCaseQuery } from "@/queries/mycase.graphql";

const getData = async () => {
	const { data } = await fetchData(MyCaseQuery.loc.source.body);
	return data?.mycase?.data?.attributes;
};

const MyCasePage = async () => {
	const { title, slug, hero, sections } = await getData();
	return (
		<main>
			<section>
				<div>
					<div>{SafeImage(hero?.image?.data, styles.image)}</div>
					<button>
						<Link href={hero?.buttons[0]?.href}>{hero?.buttons[0]?.label}</Link>
					</button>
				</div>
				<div>{SafeHtml(hero?.richText)}</div>
			</section>
			<section>
				<div>{SafeHtml(sections)}</div>
			</section>
		</main>
	);
};

export default MyCasePage;
