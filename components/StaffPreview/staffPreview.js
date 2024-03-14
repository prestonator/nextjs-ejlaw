"use client";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";
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
					<div className={styles.iconContainer}>
						{socialIcons.map(({ icon, href }) =>
							IconComponent({
								icon: icon,
								customClassName: styles.icon,
								href: href,
								key: icon,
							})
						)}
					</div>
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

function Avatar({ image }) {
	return (
		<div className={styles.avatarWrapper}>
			{SafeImage(image, styles.avatar)}
		</div>
	);
}

function StaffQuoteButton({ infoText, infoButton }) {
	return (
		<blockquote>
			{SafeHtml(infoText)}
			<Button href={infoButton?.href || []}>{infoButton?.label}</Button>
		</blockquote>
	);
}

export default StaffPreview;