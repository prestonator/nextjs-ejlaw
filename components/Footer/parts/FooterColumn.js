import styles from "../Footer.module.css";
import { SafeHtml } from "@/utils/helperFunctions";

function FooterColumn({ column }) {
	return (
		<>
			{column.map((item) => (
				<div key={item.id} className={`${styles.column} ${styles.linkColumn}`}>
					{SafeHtml(item.richText)}
				</div>
			))}
		</>
	);
}

export default FooterColumn;
