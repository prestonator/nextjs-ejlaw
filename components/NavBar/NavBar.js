import NavItem from "./parts/NavItem";
import styles from "@/components/Navbar/NavBar.module.css";
import Link from "next/link";
import { SafeImage } from "@/utils/helperFunctions";
import Image from "next/image";

async function NavBar({ navItems, logo }) {
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
				<Image
					src={process.env.STRAPI_MEDIA_ENDPOINT + logo.attributes.url}
					alt={logo.attributes.name}
					className={styles.image}
					fill
				/>
			</Link>
		</li>
	);
}

export default NavBar;
