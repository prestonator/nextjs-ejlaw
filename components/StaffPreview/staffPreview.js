"use client";
import { useInView, useSpring, animated } from "@react-spring/web";
import React from "react";
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
	const [ref, inView] = useInView({
		threshold: 0.1,
	});
	const isOdd = staffOrder % 2 === 1;
	const containerClassName = isOdd ? styles.odd : styles.even;
	const isLastItem = index === totalItems - 1;

	const textAnimation = useSpring({
		translateX: inView ? "0%" : isOdd ? "-100%" : "100%",
		opacity: inView ? 1 : 0,
		config: { mass: 1, tension: 280, friction: 60 },
		reset: true,
	});
	const imageAnimation = useSpring({
		translateX: inView ? "0%" : isOdd ? "100%" : "-100%",
		opacity: inView ? 1 : 0,
		config: { mass: 1, tension: 280, friction: 60 },
		reset: true,
	});
	const dividerAnimation = useSpring({
		opacity: inView ? 1 : 0,
		config: { mass: 1, tension: 280, friction: 60 },
		reset: true,
	});

	return (
		<>
			<div
				ref={ref}
				className={`${styles.staffPreviewContainer} ${containerClassName}`}
			>
				<animated.div
					style={imageAnimation}
					className={`${styles.colOne} ${containerClassName}`}
				>
					<IconList socialIcons={socialIcons} />
					<Avatar image={avatarImage} />
				</animated.div>
				<animated.div
					style={textAnimation}
					className={`${styles.content} ${containerClassName}`}
				>
					<StaffQuoteButton infoText={infoText} infoButton={infoButton} />
				</animated.div>
			</div>
			{!isLastItem && (
				<animated.hr style={dividerAnimation} className={styles.divider} />
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
		{socialIcons.map(({ icon, href }) => (
			<IconComponent
				icon={icon}
				customClassName={styles.icon}
				href={href}
				key={icon}
			/>
		))}
	</div>
));

export default StaffPreview;
