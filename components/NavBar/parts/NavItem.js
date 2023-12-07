// NavBar/parts/NavItem.js
"use client";
import Link from "next/link";
import styles from "../Nav.module.css";
import { useState } from "react";
import { IconComponent } from "@/utils/helperFunctions";

function NavItem({ title, url, items }) {
	const [isSubMenuClicked, setIsSubMenuClicked] = useState(false);
	const handleClick = (e) => {
		if (title === "Our Team" || title === "Practice Areas") {
			e.preventDefault();
		}
		setIsSubMenuClicked(!isSubMenuClicked);
	};

	return (
		<li className={styles.navItem} onClick={items ? handleClick : undefined}>
			{title === "Our Team" || title === "Practice Areas" ? (
				<>
					<div className={styles.navLink} onClick={handleClick}>
						<span>{title}</span>
						{IconComponent({
							icon: "IoIosArrowForward",
						})}
					</div>

					{items && (
						<SubMenu
							parentUrl={url}
							items={items}
							isClicked={isSubMenuClicked}
							setIsSubMenuClicked={handleClick}
						/>
					)}
				</>
			) : (
				<Link href={url} className={styles.navLink}>
					{title}
				</Link>
			)}
		</li>
	);
}

function SubMenu({ parentUrl, items, isClicked }) {
	return (
		<ul
			className={`${styles.subMenu} ${isClicked ? styles.subMenuClicked : ""}`}
		>
			{items.map((subItem) => {
				const href =
					parentUrl === "/our-team"
						? `${parentUrl}${subItem.slug}`
						: subItem.slug;

				return (
					<li key={subItem.id} className={styles.navItem}>
						<Link href={href} className={styles.navLink}>
							{subItem.item}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

export default NavItem;
