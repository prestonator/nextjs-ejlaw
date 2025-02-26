"use client";

import { useState, useEffect } from "react";
import { SafeImage } from "@/utils/helperFunctions";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/utils";

export function Header({ navMenu, logo }) {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [openSubmenu, setOpenSubmenu] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen]);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	// Helper function to filter out 'Logo' menu item if needed.
	const menuItems =
		navMenu?.menuItems.filter((item) => item.item !== "Logo") || [];

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
				<div className="flex items-center py-4">
					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							className="relative z-50 text-gray-600 hover:text-gray-900"
							aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
						>
							{isMobileMenuOpen ? (
								<X
									size={24}
									className="text-white"
								/>
							) : (
								<Menu size={24} />
							)}
						</button>
					</div>
					<div className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2.5">
						{leftItems.map((item) => (
							<div
								key={item.id}
								className="relative"
								onMouseEnter={() => setOpenSubmenu(item.item)}
								onMouseLeave={() => setOpenSubmenu(null)}
							>
								<Link
									href={item.slug}
									className="group inline-flex items-center font-fancy text-(length:--size-1-5)"
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
					<div className="hidden md:flex md:flex-1 md:items-center md:justify-evenly md:gap-2.5">
						{rightItems.map((item) => (
							<Link
								key={item.id}
								href={item.slug}
								className="font-fancy text-(length:--size-1-5)"
							>
								{item.item}
							</Link>
						))}
					</div>
				</div>
			</nav>

			{/* Mobile menu - Fullscreen */}
			<div
				className={cn(
					"fixed inset-0 z-40 flex items-center justify-center bg-black transition-all duration-500 ease-in-out md:hidden",
					isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
				)}
			>
				<div
					className={cn(
						"flex h-full w-full flex-col items-center justify-center gap-8 p-6 text-center transition-all duration-500",
						isMobileMenuOpen
							? "translate-y-0 scale-100 opacity-100"
							: "translate-y-8 scale-95 opacity-0"
					)}
				>
					<Link
						href="/"
						className="mb-8"
						onClick={toggleMobileMenu}
					>
						<Image
							src={logo.data.attributes.url}
							alt={logo.data.attributes.name}
							width={100}
							height={100}
							className="h-16 w-16"
						/>
					</Link>
					<div className="flex flex-col items-center gap-6 text-white">
						{menuItems.map((item) => (
							<div
								key={item.id}
								className="text-center"
							>
								{item.children ? (
									<details className="group">
										<summary className="flex cursor-pointer items-center justify-center gap-2 font-fancy text-2xl text-white">
											{item.item}
											<ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
										</summary>
										<div className="mt-4 space-y-2">
											{item.children.map((subItem) => (
												<Link
													key={subItem.id}
													href={subItem.slug}
													className="block font-fancy text-xl text-gray-300 transition-colors hover:text-white"
													onClick={toggleMobileMenu}
												>
													{subItem.item}
												</Link>
											))}
										</div>
									</details>
								) : (
									<Link
										href={item.slug}
										className="block font-fancy text-2xl text-white transition-colors hover:text-gray-300"
										onClick={toggleMobileMenu}
									>
										{item.item}
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
