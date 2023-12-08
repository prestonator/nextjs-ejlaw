import { MyCaseIcon } from "@/utils/CustomIcon";
import Link from "next/link";
import styles from "./ServiceCard.module.css";
import { IconComponent, SafeHtml } from "@/utils/helperFunctions";

const ServiceCard = (props) => {
	const { icon, content, button } = props;

	return (
		<li className={styles.card}>
			<div className={styles.iconWrapper}>
				{icon ? IconComponent({ icon: icon }) : <MyCaseIcon />}
			</div>
			{SafeHtml(content)}
			<Link className={styles.cardButton} href={button.href}>
				{button.label}
			</Link>
		</li>
	);
};

export default ServiceCard;
