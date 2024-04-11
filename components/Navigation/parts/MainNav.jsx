import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import styles from "../Nav.module.css";

const MainNav = ({ navItems, logo }) => {
	// Find the logo item from the navItems array
	const logoItem = navItems.find((item) => item.item === "Logo");
	return (
		<NavigationMenu className="hidden lg:block">
			<NavigationMenuList className="gap-[1.5vw]">
				{navItems.map((item) => {
					// Render the logo component separately
					if (item.item === "Logo") {
						return (
							<Link
								key={item.id}
								href={logoItem.slug}
								className="relative flex h-[var(--size-10)] w-[var(--size-35)]"
							>
								{SafeImage(logo.data, "object-contain", "calc(12.24vw + 71px)", "eager")}
							</Link>
						);
					}

					// Render menu items with submenus
					if (item.children) {
						return (
							<NavigationMenuItem key={item.id} className={styles.listItem}>
								<NavigationMenuTrigger
									className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group w-max text-md`}
								>
									{item.item}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className={styles.subMenu}>
										{item.children.map((subItem) => {
											// Prepend "/our-team/" to the href for "Our Team" submenu items
											const href =
												item.item === "Our Team"
													? `/our-team${subItem.slug}`
													: subItem.slug;
											return (
												<li key={subItem.id}>
													<Link href={href} legacyBehavior passHref>
														<NavigationMenuLink>
															{subItem.item}
														</NavigationMenuLink>
													</Link>
												</li>
											);
										})}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					}

					// Render regular menu items
					return (
						<NavigationMenuItem key={item.id} className={styles.listItem}>
							<Link href={item.slug} legacyBehavior passHref>
								<NavigationMenuLink
									className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
								>
									{item.item}
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default MainNav;
