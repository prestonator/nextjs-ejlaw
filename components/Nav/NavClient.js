"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce } from "./debounce";
import styles from "@/components/Nav/Nav.module.css";
import { IconComponent } from "@/utils/helperFunctions";

function NavClient({ children }) {
	// Initialize state variables
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	// Create a reference to the navbar component
	const navRef = useRef(null);

	// Debounce scroll events to not trigger the function too often
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleScroll = useCallback(
		debounce(() => {
			// Get the current scroll position of the page
			const currentScrollPos = window.pageYOffset;

			// Toggle visibility of navbar depending on the current scroll position of the page
			setVisible(prevScrollPos > currentScrollPos && currentScrollPos > 70);
			setPrevScrollPos(currentScrollPos);

			// Change the position of the navbar on screen based on previous and current position
			navRef.current.style.top =
				prevScrollPos > currentScrollPos
					? "0"
					: `-${navRef.current.clientHeight}px`;
		}, 100),
		[prevScrollPos]
	);

	// Set up scroll event listener when component mounts
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		// Clean the event listener when component is unmounted
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// CSS for navbar when hidden or visible
	const stickyStyles = {
		position: "fixed",
		width: "100%",
		height: `${navRef.current ? navRef.current.clientHeight : "auto"}`,
		transition: "top 0.6s",
	};

	// Render the component
	return (
		<nav className={styles.navContainer} style={stickyStyles} ref={navRef}>
			{/* Hamburger menu toggle */}
			<button
				aria-label="Hamburger Menu Toggle"
				className={styles.hamburgerButton}
				onClick={() => setIsNavExpanded((prevState) => !prevState)}
			>
				{IconComponent({
					icon: "SlMenu",
					customClassName: styles.hamburgerIcon,
				})}
			</button>
			{/* Menu items */}
			<div
				className={`${styles.navMenu} ${isNavExpanded ? styles.expanded : ""}`}
			>
				{children}
			</div>
		</nav>
	);
}

export default NavClient;
