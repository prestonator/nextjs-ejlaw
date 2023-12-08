import styles from "./TextCard.module.css";
import { SafeHtml } from "@/utils/helperFunctions";

function TextCard({ content }) {
	return <div className={styles.textCard}>{SafeHtml(content)}</div>;
}

export default TextCard;
