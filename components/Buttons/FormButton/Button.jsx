import styles from "./Button.module.css";
import { IconComponent } from "@/utils/helperFunctions";

function Button({ href, children, onClick, ...rest }) {
	return (
		<button href={href} className={styles.button} onClick={onClick} {...rest}>
			{children}
			{IconComponent({
				icon: "BsArrowRight",
			})}
		</button>
	);
}

export default Button;
