"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { IconComponent, SafeHtml, SafeImage } from "@/utils/helperFunctions";
import styles from "./staffPreview.module.css";
import Button from "@/components/Buttons/MainButton/Button";

function StaffPreview({
	socialIcons,
	avatarImage,
	infoText,
	infoButton,
	index,
	totalItems,
	staffOrder,
}) {
	// Use useInView hook to detect when the component is in view
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: false, // Animation plays only once
	});

	const isOdd = staffOrder % 2 === 1;
	const containerClassName = isOdd ? styles.odd : styles.even;
	const isLastItem = index === totalItems - 1;

	// Define base transition classes
	const transitionClasses = "transition-transform transition-opacity duration-700";

	// Determine the initial and in-view state classes for text and image
	const textInitialClass = isOdd ? "-translate-x-full opacity-0" : "translate-x-full opacity-0";
	const imageInitialClass = isOdd ? "translate-x-full opacity-0" : "-translate-x-full opacity-0";

	const textClasses = inView
		? `translate-x-0 opacity-100`
		: textInitialClass;

	const imageClasses = inView
		? `translate-x-0 opacity-100`
		: imageInitialClass;

	// Divider animation classes
	const dividerClasses = inView ? "opacity-100" : "opacity-0";

	return (
		<>
			<div
				ref={ref}
				className={`${styles.staffPreviewContainer} ${containerClassName}`}
			>
				{/* Image and Icons */}
				<div
					className={`${styles.colOne} ${containerClassName} ${transitionClasses} ${imageClasses}`}
				>
					<IconList socialIcons={socialIcons} />
					<Avatar image={avatarImage} />
				</div>

				{/* Text Content */}
				<div
					className={`${styles.content} ${containerClassName} ${transitionClasses} ${textClasses}`}
				>
					<StaffQuoteButton infoText={infoText} infoButton={infoButton} />
				</div>
			</div>

			{/* Divider Line */}
			{!isLastItem && (
				<hr
					className={`${styles.divider} transition-opacity duration-700 ${dividerClasses}`}
				/>
			)}
		</>
	);
}

const Avatar = React.memo(({ image }) => (
	<div className={styles.avatarWrapper}>
		{SafeImage(
			image,
			styles.avatar,
			"(min-width: 860px) calc(10.47vw + 62px), calc(17.78vw + 94px)",
			"eager"
		)}
	</div>
));

const StaffQuoteButton = React.memo(({ infoText, infoButton }) => (
	<blockquote>
		{SafeHtml(infoText)}
		<Button href={infoButton?.href || []}>{infoButton?.label}</Button>
	</blockquote>
));

const IconList = React.memo(({ socialIcons }) => (
	<div className={styles.iconContainer}>
		{socialIcons.map(({ icon, href, id }) =>
			IconComponent({
				icon: icon,
				href: href,
				customClassName: "w-12 h-12",
				key: id,
			})
		)}
	</div>
));

export default StaffPreview;