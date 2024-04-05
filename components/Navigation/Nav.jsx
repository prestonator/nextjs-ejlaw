"use client";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
	NavigationMenuTrigger,
	NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LuMenu } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

const Nav = () => {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button className="lg:hidden" size="icon" variant="outline">
						<LuMenu className="w-6 h-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Link className="relative flex h-20 w-36" href="#">
						<Image
							src="/logo.webp"
							alt="Keller Williams Logo"
							className="object-contain bg-white"
							fill
						/>
						<span className="sr-only">Stamatin Realty</span>
					</Link>
					<div className="grid gap-6 py-6">
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/"
						>
							Home
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/listings"
						>
							Our Team
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/about"
						>
							Practice Areas
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/blog"
						>
							About
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/contact"
						>
							Blog
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/contact"
						>
							In the News
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/contact"
						>
							MyCase
						</Link>
						<Link
							className="flex items-center w-full py-2 text-lg font-semibold"
							href="/contact"
						>
							Contact
						</Link>
					</div>
				</SheetContent>
			</Sheet>
			<NavigationMenu className="hidden lg:block">
				<NavigationMenuList className="gap-[1.5vw]">
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group w-max text-md`}
							>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<NavigationMenuTrigger
							className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group w-max text-md`}
						>
							Our Team
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className={styles.subMenu}>
								<li>
									<Link href="/our-team/elton-jenkins" legacyBehavior passHref>
										<NavigationMenuLink>Elton Jenkins</NavigationMenuLink>
									</Link>
								</li>
								<li>
									<Link href="/our-team/eric-kroier" legacyBehavior passHref>
										<NavigationMenuLink>Eric Kroier</NavigationMenuLink>
									</Link>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<NavigationMenuTrigger
							className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group w-max text-md`}
						>
							Practice Areas
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className={styles.subMenu}>
								<li>
									<Link href="/criminal-defense" legacyBehavior passHref>
										<NavigationMenuLink>Criminal Defense</NavigationMenuLink>
									</Link>
								</li>
								<li>
									<Link href="/family-law" legacyBehavior passHref>
										<NavigationMenuLink>Family Law</NavigationMenuLink>
									</Link>
								</li>
								<li>
									<Link href="/mediation" legacyBehavior passHref>
										<NavigationMenuLink>Mediation</NavigationMenuLink>
									</Link>
								</li>
								<li>
									<Link href="/personal-injury" legacyBehavior passHref>
										<NavigationMenuLink>Personal Injury</NavigationMenuLink>
									</Link>
								</li>
								<li>
									<Link href="/expungements" legacyBehavior passHref>
										<NavigationMenuLink>Expungements</NavigationMenuLink>
									</Link>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/about" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
							>
								About
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<Link
						href="/"
						className="relative flex h-[var(--size-10)] w-[var(--size-35)]"
					>
						<Image
							src="/logo.webp"
							alt="{logo.attributes.name}"
							className="object-contain"
							sizes="(min-width: 1460px) calc(12.27vw + 70px), (min-width: 920px) calc(8.65vw + 54px), calc(21.33vw + 110px)"
							fill
						/>
					</Link>
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/blog" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
							>
								Blog
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/in-the-news" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
							>
								In the News
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/my-case" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
							>
								MyCase
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem className={styles.listItem}>
						<Link href="/contact" legacyBehavior passHref>
							<NavigationMenuLink
								className={`${styles.menuItem} inline-flex items-center justify-center px-4 py-2 font-medium transition-colors rounded-md group h-9 w-max text-md`}
							>
								Contact
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	);
};

export default Nav;
