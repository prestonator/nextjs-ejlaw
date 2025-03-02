"use client";

import { useState, useEffect } from "react"; // Removed unused useRef
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import {
	ChevronDown,
	Menu,
	X,
	ChevronRight,
	Phone,
	Mail,
	MapPin,
	FileText,
} from "lucide-react"; // Removed unused icons
import { cn } from "@/utils";

export function Header({ navMenu, logo }) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [openSubmenu, setOpenSubmenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Renamed from isOpen to isMobileMenuOpen to align with existing state
	const [activeMobileItem, setActiveMobileItem] = useState(null); // State for active mobile submenu

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		// Prevent scrolling when mobile menu is open
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		if (!isMobileMenuOpen) {
			setActiveMobileItem(null); // Close submenus when closing main menu
		}
	};

	const toggleMobileSubMenu = (label) => {
		setActiveMobileItem(activeMobileItem === label ? null : label);
	};

	// Helper function to filter out 'Logo' menu item if needed.
	const menuItems =
		navMenu?.menuItems.filter((item) => item.item !== "Logo") || [];

	// Transform menuItems to navItems structure (basic mapping, you might need to enhance this)
	const navItems = menuItems.map((item) => ({
		label: item.item,
		href: item.slug,
		icon: <FileText className="h-5 w-5" />, // Default icon for now, you can customize this
		items: item.children
			? item.children.map((child) => ({
					label: child.item,
					href: child.slug,
					icon: <FileText className="h-4 w-4" />, // Default sub-item icon
			  }))
			: undefined,
	}));

	// Split into left/right groups (4 items each)
	const leftItems = menuItems.slice(0, 4);
	const rightItems = menuItems.slice(4);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300",
				!isVisible && "-translate-y-full"
			)}
		>
			<div className="border-b">
				<div className="container mx-auto px-4">
					<div className="py-2 text-center text-sm">
						<a
							href="https://elton-jenkins-attorney-at-law.mycase.com/paypage/DNMiVDCbKLCJvWyCSiPEe3FA"
							target="_blank"
							rel="noopener noreferrer"
						>
							Notice: Visit our payment page to settle your invoices online.
						</a>
					</div>
				</div>
			</div>
			<nav className="mx-auto px-4">
				<div className="flex justify-between items-center py-1md:py-4">
					<div className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2">
						{leftItems.map((item) => (
							<div
								key={item.id}
								className="relative"
								onMouseEnter={() => setOpenSubmenu(item.item)}
								onMouseLeave={() => setOpenSubmenu(null)}
							>
								<Link
									href={item.slug}
									className="group font-fancy relative inline-flex items-center justify-center px- py-2 text-(length:--size-1-5) after:absolute after:left-0 after:w-full after:border-b after:border-black after:top-full after:transition-all after:content-[''] hover:after:top-0"
								>
									{item.item}
									{item.children && (
										<ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
									)}
								</Link>
								{item.children && openSubmenu === item.item && (
									<div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-white py-2 shadow-lg transition-opacity duration-200 ease-in-out">
										{item.children.map((subItem) => (
											<Link
												key={subItem.id}
												href={subItem.slug}
												className="block px-4 py-2 font-fancy hover:bg-gray-50"
											>
												{subItem.item}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</div>
					<div className="flex-shrink-0 md:mx-[2.5vw]">
						<Link
							href="/"
							className="relative flex h-16 w-[15vw]"
						>
							{SafeImage(logo.data, "object-contain", "calc(12.24vw + 71px)", "eager")}
						</Link>
					</div>
					<div className="hidden md:relative md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2.5">
						{rightItems.map((item) => (
							<Link
								key={item.id}
								href={item.slug}
								className="font-fancy relative inline-flex items-center justify-center px-2 py-2 text-(length:--size-1-5) after:absolute after:left-0 after:w-full after:border-b after:border-black after:top-full after:transition-all after:content-[''] hover:after:top-0"
							>
								{item.item}
							</Link>
						))}
					</div>
					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#800000] transition-colors hover:bg-gray-200"
							aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
						>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile menu - Fullscreen - INTEGRATED FROM MobileNavigation */}
			<div
				className={cn(
					"fixed inset-0 z-30 bg-white pt-16 overflow-hidden transition-opacity duration-300 md:hidden", // Added md:hidden
					isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none" // pointer-events-none when closed
				)}
			>
				

				<div className="relative h-full flex flex-col">
					<div className="flex-1 overflow-y-auto">
						<nav className="p-4">
							<ul className="space-y-1">
								{navItems.map((item, index) => (
									<li
										key={item.label}
										className={cn(
											"rounded-xl overflow-hidden",
											activeMobileItem === item.label ? "bg-gray-50" : ""
										)}
										style={{ transitionDelay: `${index * 0.05}s` }} // Staggered animation with CSS delay
									>
										{item.items ? (
											<div>
												<button
													onClick={() => toggleMobileSubMenu(item.label)}
													className="flex w-full items-center justify-between p-4 text-lg font-cormorant"
													aria-expanded={activeMobileItem === item.label ? "true" : "false"}
												>
													<div className="flex items-center gap-3">
														<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#800000]">
															{item.icon}
														</div>
														<span className="">{item.label}</span>
													</div>
													<ChevronRight
														className={cn(
															"h-5 w-5 text-[#800000] transition-transform duration-200",
															activeMobileItem === item.label ? "rotate-90" : ""
														)}
													/>
												</button>

												<ul
													className={cn(
														"bg-gray-50 transition-max-height-opacity duration-300 overflow-hidden",
														activeMobileItem === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
													)} // max-h-96 is an example, adjust as needed
													style={{ willChange: "max-height, opacity" }} // Optimize for transitions
												>
													{item.items.map((subItem, subIndex) => (
														<li
															key={subItem.label}
															style={{
																transitionDelay: `${0.1 + subIndex * 0.03}s`,
																opacity: activeMobileItem === item.label ? 1 : 0,
																transform:
																	activeMobileItem === item.label ? "translateX(0)" : "translateX(-10px)",
																transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
															}}
														>
															<Link
																href={subItem.href}
																className="flex items-center gap-3 py-3 pl-16 pr-4 text-gray-700 hover:text-[#800000] font-cormorant"
																onClick={toggleMobileMenu} // Close menu on subitem click
															>
																<span className="text-[#800000]">{subItem.icon}</span>
																<span>{subItem.label}</span>
															</Link>
														</li>
													))}
												</ul>
											</div>
										) : (
											<Link
												href={item.href}
												className="flex items-center gap-3 p-4 text-lg font-cormorant hover:text-[#800000]"
												onClick={toggleMobileMenu} // Close menu on item click
											>
												<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#800000]">
													{item.icon}
												</div>
												<span className="">{item.label}</span>
											</Link>
										)}
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* Contact and CTA section */}
					<div
						className={cn(
							"relative mt-auto transition-opacity transform duration-300 translate-y-5 opacity-0",
							isMobileMenuOpen ? "opacity-100 translate-y-0 delay-150" : ""
						)}
					>
						{/* Decorative top border */}
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

						{/* Main content container - reduced padding */}
						<div className="p-4 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-md">
							{/* Primary CTA - more compact */}
							<div
								className="mb-4 transition-transform duration-200 scale-95 opacity-0"
								style={{
									transitionDelay: isMobileMenuOpen ? "0.4s" : "0s",
									transform: isMobileMenuOpen ? "scale(1)" : "scale(0.95)",
									opacity: isMobileMenuOpen ? "1" : "0",
								}}
							>
								<Link
									href="/contact"
									onClick={toggleMobileMenu}
									className="group relative block w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-sm hover:scale-105 transition-transform duration-200"
								>
									<div className="relative flex flex-col items-center gap-0.5 border border-gray-200 px-4 py-3 transition-colors hover:border-gray-300">
										<span className="text-xs uppercase tracking-wider text-[#800000]">
											Start Your Journey to Justice
										</span>
										<span className="text-lg font-cormorant">Schedule Your Case Evaluation</span>
									</div>
								</Link>
							</div>

							{/* Contact Information - More compact grid */}
							<div
								className="grid gap-3 opacity-0 translate-y-5 transition-opacity transform duration-300"
								style={{
									transitionDelay: isMobileMenuOpen ? "0.5s" : "0s",
									transform: isMobileMenuOpen ? "translateY(0)" : "translateY(5px)",
									opacity: isMobileMenuOpen ? "1" : "0",
								}}
							>
								{/* Phone and Email in one row */}
								<div className="grid grid-cols-2 gap-2">
									<Link
										href="tel:404-217-2623"
										className="group flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 text-center shadow-sm transition-all hover:shadow-md"
									>
										<Phone className="h-4 w-4 text-[#800000] transition-transform group-hover:scale-110" />
										<span className="text-base font-cormorant">(404) 217-2623</span>
									</Link>

									<Link
										href="mailto:elton@eltonjenkinslaw.com"
										className="group flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 shadow-sm transition-all hover:shadow-md overflow-hidden"
									>
										<Mail className="h-4 w-4 flex-shrink-0 text-[#800000] transition-transform group-hover:scale-110" />
										<span className="text-base font-cormorant truncate">
											elton@eltonjenkinslaw.com
										</span>
									</Link>
								</div>

								{/* Address with Map Link */}
								<Link
									href="https://maps.google.com/?q=124+E+Main+Street,+Norman,+OK+73069"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:text-[#800000]"
								>
									<MapPin className="h-4 w-4 flex-shrink-0 text-[#800000] transition-transform group-hover:scale-110" />
									<div className="flex items-center gap-1 font-cormorant text-base">
										<span>124 E Main Street,</span>
										<span className="text-gray-600">Norman, OK 73069</span>
									</div>
								</Link>

								{/* Social Proof - More compact */}
								<div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
									<span>⭑⭑⭑⭑⭑</span>
									<span className="font-cormorant italic">Serving Oklahoma Since 1995</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
