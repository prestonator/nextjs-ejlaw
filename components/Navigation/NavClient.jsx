"use client";
import { useState, useEffect } from "react";
import styles from "./Nav.module.css";

const NavbarClient = ({ children }) => {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);
	return (
		<header
			className={`${styles.header} ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			} fixed flex items-center justify-center w-screen h-12 lg:h-20 pt-4 lg:pt-8 xl:pt-12 pb-2 shrink-0 transition-transform duration-300 bg-white`}
		>
			<div className="h-[5vh] py-2 text-sm text-center z-[4] top-0 bg-white absolute">
				<a
					className="text-[#800000] hover:text-blue-700"
					href="https://elton-jenkins-attorney-at-law.mycase.com/paypage/DNMiVDCbKLCJvWyCSiPEe3FA"
					target="_blank"
				>
					Important Notice: Please visit our payment page to settle your
					invoices online.
				</a>
			</div>
			{children}
		</header>
	);
};

export default NavbarClient;
