"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Nav.module.css";

const NavbarClient = ({ children }) => {
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			lastScrollY.current = currentScrollY;
		};

		const throttledHandleScroll = throttle(handleScroll, 200);
		window.addEventListener("scroll", throttledHandleScroll);

		return () => {
			window.removeEventListener("scroll", throttledHandleScroll);
		};
	}, []);

	return (
		<header
			className={`${styles.header} ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			} fixed flex items-center justify-center w-screen h-12 lg:h-20 pt-6 lg:pt-8 xl:pt-12 pb-2 shrink-0 transition-transform duration-300 bg-white`}
		>
			<div className="h-[5vh] py-2 text-sm text-center z-[4] top-0 bg-white absolute">
				<a
					className="text-[#800000] hover:text-blue-700"
					href="https://elton-jenkins-attorney-at-law.mycase.com/paypage/DNMiVDCbKLCJvWyCSiPEe3FA"
					target="_blank"
				>
					Notice: Visit our payment page to settle your
					invoices online.
				</a>
			</div>
			{children}
		</header>
	);
};

export default NavbarClient;

function throttle(fn, wait) {
	let time = Date.now();
	return function () {
		if (time + wait - Date.now() < 0) {
			fn();
			time = Date.now();
		}
	};
}