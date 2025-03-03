"use client";

import { useState, useEffect, useRef } from "react";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import { cn } from "@/utils";
import { IconComponent } from "@/utils/RenderIcon";
import { MyCaseIcon } from "@/utils/CustomIcon";

// Extracted common styling constants
const THEME_COLOR = "text-[#800000]";
const HOVER_UNDERLINE_STYLE =
	"relative after:absolute after:left-0 after:w-full after:border-b after:border-black after:top-full after:transition-all after:content-[''] hover:after:top-0";

function MobileMenuToggleButton({ isOpen, toggleMenu, customColor }) {
	const colorClass = customColor || THEME_COLOR;
	return (
		<button
			onClick={toggleMenu}
			className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ${colorClass} transition-colors hover:bg-gray-200`}
			aria-label={isOpen ? "Close main menu" : "Open main menu"}
		>
			{IconComponent({
				icon: isOpen ? "LuX" : "LuMenu",
				customClassName: "h-5 w-5",
			})}
		</button>
	);
}

// Extracted desktop menu item component
function DesktopMenuItem({
	item,
	openSubmenu,
	handleMouseEnter,
	handleMouseLeave,
	submenuRefs,
}) {
	return (
		<div
			className="relative"
			onMouseEnter={() => handleMouseEnter(item.item)}
			onMouseLeave={(e) => handleMouseLeave(e, item.item)}
		>
			<Link
				href={item.slug}
				className={`group font-fancy inline-flex items-center justify-center px-2 py-2 text-(length:--size-1-5) ${HOVER_UNDERLINE_STYLE}`}
			>
				{item.item}
				{item.children &&
					IconComponent({
						icon: "LuChevronDown",
						customClassName: "ml-1 h-4 w-4 transition-transform group-hover:rotate-180",
					})}
			</Link>
			{item.children && openSubmenu === item.item && (
				<div
					ref={(el) => (submenuRefs.current[item.item] = el)}
					className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-white py-2 shadow-lg transition-opacity duration-200 ease-in-out"
					onMouseEnter={() => handleMouseEnter(item.item)}
					onMouseLeave={() => setOpenSubmenu(null)}
				>
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
	);
}

// Notice component used in both mobile and desktop
function PaymentNotice() {
	return (
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
	);
}

// Mobile menu item component
function MobileMenuItem({
	item,
	activeMobileItem,
	toggleMobileSubMenu,
	toggleMobileMenu,
}) {
	return (
		<li
			className={cn(
				"rounded-xl overflow-hidden",
				activeMobileItem === item.item ? "bg-gray-50" : ""
			)}
		>
			{item.children ? (
				<div>
					<button
						onClick={() => toggleMobileSubMenu(item.item)}
						className="flex w-full items-center justify-between p-4 text-lg font-fancy font-semibold"
						aria-expanded={activeMobileItem === item.item ? "true" : "false"}
					>
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#800000]">
								{IconComponent({
									icon: item.mobileIcon,
									customClassName: "h-5 w-5",
								})}
							</div>
							<span>{item.item}</span>
						</div>
						{IconComponent({
							icon: "LuChevronRight",
							customClassName: cn(
								"h-5 w-5 text-[#800000] transition-transform duration-200",
								activeMobileItem === item.item ? "rotate-90" : ""
							),
						})}
					</button>

					<ul
						className={cn(
							"bg-gray-50 transition-max-height-opacity duration-300 overflow-hidden",
							activeMobileItem === item.item ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
						)}
						style={{ willChange: "max-height, opacity" }}
					>
						{item.children.map((subItem, subIndex) => (
							<li
								key={subItem.item}
								style={{
									transitionDelay: `${0.1 + subIndex * 0.03}s`,
									opacity: activeMobileItem === item.item ? 1 : 0,
									transform:
										activeMobileItem === item.item ? "translateX(0)" : "translateX(-10px)",
									transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
								}}
							>
								<Link
									href={subItem.slug}
									className="flex items-center gap-3 py-3 pl-16 pr-4 text-gray-700 hover:text-[#800000] font-fancy font-semibold"
									onClick={toggleMobileMenu}
								>
									<span className="text-[#800000]">
										{IconComponent({
											icon: subItem.mobileIcon,
											customClassName: "h-4 w-4",
										})}
									</span>
									<span>{subItem.item}</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<Link
					href={item.slug}
					className="flex items-center gap-3 p-4 text-lg font-fancy font-semibold hover:text-[#800000]"
					onClick={toggleMobileMenu}
				>
					<div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-[#800000]">
						{item.item === "MyCase" ? (
							<MyCaseIcon />
						) : (
							IconComponent({
								icon: item.mobileIcon,
								customClassName: "h-5 w-5",
							})
						)}
					</div>
					<span>{item.item}</span>
				</Link>
			)}
		</li>
	);
}

// Logo component
function Logo({ logo, onClick }) {
	return (
		<Link
			href="/"
			className={
				onClick ? "relative flex h-16 w-[40vw]" : "relative flex h-16 w-[15vw]"
			}
			onClick={onClick}
		>
			{SafeImage(logo.data, "object-contain", "calc(12.24vw + 71px)", "eager")}
		</Link>
	);
}

export function Header({ navMenu, logo }) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [openSubmenu, setOpenSubmenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeMobileItem, setActiveMobileItem] = useState(null);
	const submenuRefs = useRef({});

	// Handle scroll events
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsVisible(currentScrollY < lastScrollY || currentScrollY < 50);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	// Close mobile menu on window resize
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Handle body scroll lock when mobile menu is open
	useEffect(() => {
		document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		if (!isMobileMenuOpen) {
			setActiveMobileItem(null);
		}
	};

	const toggleMobileSubMenu = (label) => {
		setActiveMobileItem(activeMobileItem === label ? null : label);
	};

	const handleMouseEnter = (label) => {
		setOpenSubmenu(label);
	};

	const handleMouseLeave = (e, label) => {
		// Check if moving from parent to submenu
		const submenuElement = submenuRefs.current[label];
		if (submenuElement) {
			const rect = submenuElement.getBoundingClientRect();
			const isMovingToSubmenu =
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top - 10 && // Small buffer zone
				e.clientY <= rect.bottom;

			if (isMovingToSubmenu) {
				return; // Don't close the submenu if moving to it
			}
		}
		setOpenSubmenu(null);
	};

	const menuItems =
		navMenu?.menuItems.filter((item) => item.item !== "Logo") || [];
	const leftItems = menuItems.slice(0, 4);
	const rightItems = menuItems.slice(4);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-transform duration-300",
				!isVisible && "-translate-y-full"
			)}
		>
			{/* Desktop Header */}
			<div className="hidden md:block">
				<PaymentNotice />
				<nav className="mx-auto px-4">
					<div className="flex justify-between items-center py-1 md:py-4">
						<div className="flex flex-1 items-center justify-evenly gap-2">
							{leftItems.map((item) => (
								<DesktopMenuItem
									key={item.id}
									item={item}
									openSubmenu={openSubmenu}
									handleMouseEnter={handleMouseEnter}
									handleMouseLeave={handleMouseLeave}
									submenuRefs={submenuRefs}
								/>
							))}
						</div>
						<div className="flex-shrink-0 mx-[2.5vw]">
							<Logo logo={logo} />
						</div>
						<div className="relative flex flex-1 items-center justify-evenly gap-2.5">
							{rightItems.map((item) => (
								<Link
									key={item.id}
									href={item.slug}
									className={`font-fancy inline-flex items-center justify-center px-2 py-2 text-(length:--size-1-5) ${HOVER_UNDERLINE_STYLE}`}
								>
									{item.item}
								</Link>
							))}
						</div>
					</div>
				</nav>
			</div>

			{/* Mobile Header */}
			<div className={cn("md:hidden", !isVisible && "-translate-y-full")}>
				{/* Mobile Top Bar */}
				<div>
					<PaymentNotice />

					{/* Logo and menu toggle */}
					<div className="flex items-center justify-between px-4 py-2">
						<div className="flex-shrink-0">
							<Logo
								logo={logo}
								onClick={toggleMobileMenu}
							/>
						</div>
						<MobileMenuToggleButton
							isOpen={isMobileMenuOpen}
							toggleMenu={toggleMobileMenu}
							customColor={THEME_COLOR}
						/>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				<div
					className={cn(
						"inset-0 z-30 bg-white overflow-hidden transition-opacity duration-300 md:hidden",
						isMobileMenuOpen ? "opacity-100" : "hidden opacity-0 pointer-events-none"
					)}
				>
					<div className="relative h-full flex flex-col">
						{/* Mobile Navigation */}
						<div className="basis-[50vh] overflow-y-auto">
							<nav className="p-4 pb-0">
								<ul className="space-y-1">
									{menuItems.map((item, index) => (
										<MobileMenuItem
											key={item.id}
											item={item}
											activeMobileItem={activeMobileItem}
											toggleMobileSubMenu={toggleMobileSubMenu}
											toggleMobileMenu={toggleMobileMenu}
										/>
									))}
								</ul>
							</nav>
						</div>
						{/* Contact and CTA section */}
						<div
							className={cn(
								"relative basis-[40vh] mt-auto transition-opacity transform duration-300 opacity-0",
								isMobileMenuOpen ? "opacity-100 delay-150" : ""
							)}
						>
							{/* Decorative top border */}
							<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

							{/* Main content container */}
							<div className="p-2 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-md">
								{/* Primary CTA */}
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
											<span className="text-lg font-fancy font-semibold">
												Schedule Your Case Evaluation
											</span>
										</div>
									</Link>
								</div>

								{/* Contact Information Grid */}
								<div
									className="grid gap-3 opacity-0 translate-y-5 transition-opacity transform duration-300"
									style={{
										transitionDelay: isMobileMenuOpen ? "0.5s" : "0s",
										transform: isMobileMenuOpen ? "translateY(0)" : "translateY(5px)",
										opacity: isMobileMenuOpen ? "1" : "0",
									}}
								>
									{/* Phone and Email row */}
									<div className="grid grid-cols-2 gap-2">
										<Link
											href="tel:404-217-2623"
											className="group flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 text-center shadow-sm transition-all hover:shadow-md"
										>
											{IconComponent({
												icon: "LuPhone",
												customClassName:
													"h-4 w-4 text-[#800000] transition-transform group-hover:scale-110",
											})}
											<span className="text-base font-fancy font-semibold">(404) 217-2623</span>
										</Link>

										<Link
											href="mailto:elton@eltonjenkinslaw.com"
											className="group flex items-center gap-2 rounded-md bg-white/80 px-3 py-2 shadow-sm transition-all hover:shadow-md overflow-hidden"
										>
											{IconComponent({
												icon: "LuMail",
												customClassName:
													"h-4 w-4 flex-shrink-0 text-[#800000] transition-transform group-hover:scale-110",
											})}
											<span className="text-base font-fancy font-semibold truncate">
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
										{IconComponent({
											icon: "LuMapPin",
											customClassName:
												"h-4 w-4 flex-shrink-0 text-[#800000] transition-transform group-hover:scale-110",
										})}
										<div className="flex items-center gap-1 font-fancy font-semibold text-base">
											<span>124 E Main Street,</span>
											<span className="text-gray-600">Norman, OK 73069</span>
										</div>
									</Link>

									{/* Social Proof */}
									<div className="flex items-center justify-center gap-2 text-center text-xs text-gray-500">
										<span>⭑⭑⭑⭑⭑</span>
										<span className="font-fancy font-semibold italic">
											Serving Oklahoma Since 1995
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
