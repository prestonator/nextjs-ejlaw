import styles from "./Button.module.css";
import { IconComponent } from "@/utils/helperFunctions";
import Link from "next/link";

function Button({ href, children }) {
	return (
		<Link href={href} className={styles.button}>
			{children}
			{IconComponent({
				icon: "BsArrowRight",
			})}
		</Link>
	);
}

export default Button;
