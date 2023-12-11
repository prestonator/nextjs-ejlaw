import styles from "./BlogCard.module.css";
import Link from "next/link";
import {
	SafeImage,
	formatDate,
	SafeHtml,
} from "@/utils/helperFunctions";

function BlogCard(props) {
	const { title, slug, author, date, excerpt, image, categories } = props;
	return (
		<Link href={slug} className={styles.cardContainer}>
			<div className={styles.cardWrapper}>
				<div className={styles.imageWrapper}>
					{SafeImage(image, styles.image)}
				</div>
				<div className={styles.textWrapper}>
					<h4>{title}</h4>
					<span>{SafeHtml(formatDate(date))}</span>

					<p>By {author}</p>
					<div>{SafeHtml(excerpt)}</div>
					<div className={styles.categoryContainer}>
						{categories}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default BlogCard;
