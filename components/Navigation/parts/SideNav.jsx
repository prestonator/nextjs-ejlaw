import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LuMenu } from "react-icons/lu";
import styles from "../Nav.module.css";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {
    return (
			<Sheet>
				<SheetTrigger asChild>
					<Button className="lg:hidden" size="icon" variant="outline">
						<LuMenu className="w-6 h-6" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<Link className="relative flex h-20 w-52" href="/">
						<Image
							src="/logo.webp"
							alt="Logo for Elton Jenkins Law, PLLC"
							className="object-contain bg-white"
							fill
						/>
						<span className="sr-only">Elton Jenkins Law, PLLC</span>
					</Link>
					<div className="grid gap-6 py-6">
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/"
						>
							Home
						</Link>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger className="flex items-center w-full py-2 font-sans text-lg font-bold bg-transparent hover:bg-gray-200">
									Our Team
								</AccordionTrigger>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/our-team/elton-jenkins" className="w-full">
										Elton Jenkins
									</Link>
								</AccordionContent>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/our-team/eric-kroier" className="w-full">
										Eric Kroier
									</Link>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-2">
								<AccordionTrigger className="flex items-center w-full py-2 font-sans text-lg font-bold bg-transparent hover:bg-gray-200">
									Practice Areas
								</AccordionTrigger>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/criminal-defense" className="w-full">
										Criminal Defense
									</Link>
								</AccordionContent>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/family-law" className="w-full">
										Family Law
									</Link>
								</AccordionContent>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/mediation" className="w-full">
										Mediation
									</Link>
								</AccordionContent>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/expungements" className="w-full">
										Expungements
									</Link>
								</AccordionContent>
								<AccordionContent
									className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								>
									<Link href="/personal-injury" className="w-full">
										Personal Injury
									</Link>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/about"
						>
							About
						</Link>
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/blog"
						>
							Blog
						</Link>
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/in-the-news"
						>
							In the News
						</Link>
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/my-case"
						>
							MyCase
						</Link>
						<Link
							className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
							href="/contact"
						>
							Contact
						</Link>
					</div>
				</SheetContent>
			</Sheet>
		);
};

export default SideNav;
