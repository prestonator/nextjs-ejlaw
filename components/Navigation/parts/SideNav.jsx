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
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";

const SideNav = ({ navItems, logo }) => {
	// Find the logo item from the navItems array
	const logoItem = navItems.find((item) => item.item === "Logo");

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="z-[5] bg-transparent cursor-pointer hover:bg-transparent lg:hidden"
					size="icon"
					variant="outline"
				>
					<LuMenu className="w-6 h-6" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<Link className="relative flex h-20 w-52" href={logoItem.slug}>
					{SafeImage(
						logo.data,
						"object-contain bg-white",
						"calc(12.24vw + 71px)",
						"eager"
					)}
					<span className="sr-only">{logo.data.attributes.name}</span>
				</Link>
				<div className="grid gap-6 py-6">
					{navItems.map((item) => {
						// Skip rendering the logo item
						if (item.item === "Logo") {
							return null;
						}

						// Render items with submenus (accordion)
						if (item.children) {
							return (
								<Accordion
									key={item.id}
									type="single"
									collapsible
									className="w-full"
								>
									<AccordionItem value={`item-${item.id}`}>
										<AccordionTrigger className="flex items-center w-full py-2 font-sans text-lg font-bold bg-transparent hover:bg-gray-200">
											{item.item}
										</AccordionTrigger>
										{item.children.map((subItem) => {
											// Prepend "/our-team/" to the href for "Our Team" submenu items
											const href =
												item.item === "Our Team"
													? `/our-team${subItem.slug}`
													: subItem.slug;

											return (
												<AccordionContent
													key={subItem.id}
													className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
												>
													<Link href={href} className="w-full">
														{subItem.item}
													</Link>
												</AccordionContent>
											);
										})}
									</AccordionItem>
								</Accordion>
							);
						}

						// Render regular menu items
						return (
							<Link
								key={item.id}
								className={`${styles.sheetLink} flex items-center w-full py-2 text-lg font-semibold`}
								href={item.slug}
							>
								{item.item}
							</Link>
						);
					})}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SideNav;
