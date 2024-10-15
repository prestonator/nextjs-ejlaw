import Link from "next/link";
import styles from "./FloatingButton.module.css";
import { IconComponent } from "@/utils/RenderIcon";

const FloatingButton = () => {
	return (
		<Link className={styles.floatingButton} href="/contact">
			{IconComponent({
				icon: "LuCalendar",
				customClassName: styles.icon,
			})}
			Book my Consult
		</Link>
	);
};

export default FloatingButton;
