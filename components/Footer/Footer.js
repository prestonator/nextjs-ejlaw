import FooterColumn from "./parts/FooterColumn";
import styles from "./Footer.module.css";
import { IconComponent, SafeHtml, SafeImageUrl } from "@/utils/helperFunctions";

export default async function Footer({ footer }) {
	const { image, modalText, column, socialIcons } = footer;
	return (
		<footer className={styles.footer}>
			<div
				className={styles.footerHero}
				style={{
					backgroundImage: `url(${SafeImageUrl(image?.data)})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundAttachment: "fixed",
					width: "100%",
				}}
			>
				<div className={styles.textContent}>{SafeHtml(modalText)}</div>
			</div>
			<div className={styles.footerWrapper}>
				<div className={`${styles.footerContainer}`}>
					<FooterColumn column={column} />
					<div className={`${styles.column} ${styles.signUpColumn}`}>
						<div className={`${styles.row} ${styles.iconWrapper}`}>
							{socialIcons?.map(({ icon, href, id }) =>
								IconComponent({
									icon: icon,
									customClassName: styles.icon,
									href: href,
									key: id,
								})
							)}
						</div>
						<div className={`${styles.row} ${styles.formWrapper}`}>
							<input
								className={styles.textInput}
								type="text"
								placeholder="Name"
							/>
							<input
								className={styles.textInput}
								type="text"
								placeholder="Email"
							/>
							<input
								className={styles.textInput}
								type="text"
								placeholder="Phone"
							/>
							<input
								className={styles.submitInput}
								type="submit"
								value="Submit"
							/>
						</div>
						<div className={`${styles.row} ${styles.copyRightWrapper}`}>
							Copyright ©{new Date().getFullYear()} | All Rights Reserved
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
