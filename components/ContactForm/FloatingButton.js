import Link from "next/link";
import styles from "./FloatingButton.module.css";
import { IconComponent } from "@/utils/helperFunctions";

const FloatingButton = () => {
	return (
		<Link className={styles.floatingButton} href="/contact">
			{IconComponent({
				icon: "BsCalendar4",
				customClassName: styles.icon,
			})}
			Book my Consult
		</Link>
	);
};

export default FloatingButton;
