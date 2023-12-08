import Link from "next/link";
import styles from "./IconCard.module.css";
import { IconComponent, SafeHtml } from "@/utils/helperFunctions";

function IconCard({ icon, content }) {
	return (
		<Link href={icon.href} className={styles.iconCard}>
			<div className={styles.iconWrapper}>
				{IconComponent({
					icon: icon.icon,
				})}
			</div>
			{SafeHtml(content)}
		</Link>
	);
}

export default IconCard;
