import NavItem from "./parts/NavItem";
import styles from "./Nav.module.css";
import Link from "next/link";
import { SafeImage } from "@/utils/helperFunctions";

async function Navbar({ navItems, logo }) {
	const ourTeam = navItems.menuItems[1].children;
	const practiceAreas = navItems.menuItems[2].children;

	return (
		<ul className={styles.navbarItems}>
			{navItems.menuItems.map((menuItem, index) => {
				const { item, slug, id } = menuItem;
				if (item === "Logo") {
					return <Logo key={logo.data.id} url={slug} logo={logo.data} />;
				}

				if (item === "Our Team") {
					return (
						<NavItem
							key={menuItem.id}
							title={item}
							url={slug}
							items={ourTeam}
						/>
					);
				}

				if (item === "Practice Areas") {
					return (
						<NavItem
							key={menuItem.id}
							title={item}
							url={slug}
							items={practiceAreas}
						/>
					);
				}

				return <NavItem key={id} title={item} url={slug} />;
			})}
		</ul>
	);
}

function Logo({ url, logo }) {
	return (
		<li className={`${styles.navItem} ${styles.logoItem}`}>
			<Link href={url} className={styles.logoWrapper}>
				{SafeImage(logo, styles.image)}
			</Link>
		</li>
	);
}

export default Navbar;
