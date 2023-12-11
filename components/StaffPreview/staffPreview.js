"use client";
import React, { useEffect } from "react";
import {
	IconComponent,
	SafeHtml,
	SafeImage,
} from "@/utils/helperFunctions";
import styles from "./staffPreview.module.css";
import Button from "@/components/Buttons/MainButton/Button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Variants outside of the StaffPreview component
const getImageVariant = (placement) => ({
	visible: {
		translateX: "0%",
		opacity: 1,
		transition: { duration: 0.75, type: "ease" },
	},
	hidden: { opacity: 0, translateX: placement ? "-100%" : "100%" },
});

const getTextVariant = (placement) => ({
	visible: {
		translateX: "0%",
		opacity: 1,
		transition: { duration: 0.75, type: "ease" },
	},
	hidden: { opacity: 0, translateX: placement ? "100%" : "-100%" },
});

const dividerVariant = {
	visible: { opacity: 1, transition: { duration: 0.75, type: "ease" } },
	hidden: { opacity: 0 },
};

function StaffPreview({
	socialIcons,
	avatarImage,
	infoText,
	infoButton,
	index,
	totalItems,
	placement,
}) {
	const containerClassName = placement ? styles.even : styles.odd;
	const shouldRenderDivider = index !== totalItems - 1;

	const control = useAnimation();
	const [ref, inView] = useInView();

	useEffect(() => {
		control.start(inView ? "visible" : "hidden");
	}, [control, inView]);

	return (
		<>
			<div
				ref={ref}
				className={`${styles.staffPreviewContainer} ${containerClassName}`}
			>
				<MotionElement
					variants={getImageVariant(placement)}
					initial="hidden"
					animate={control}
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
				</MotionElement>
				<MotionElement
					variants={getTextVariant(placement)}
					initial="hidden"
					animate={control}
					className={`${styles.content} ${containerClassName}`}
				>
					<StaffQuoteButton infoText={infoText} infoButton={infoButton} />
				</MotionElement>
			</div>
			{shouldRenderDivider && (
				<motion.hr
					variants={dividerVariant}
					initial="hidden"
					animate={control}
					className={`${styles.divider}`}
				/>
			)}
		</>
	);
}

function StaffListNode({ children }) {
	// This component is never used, consider removing it.
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
			<Button href={infoButton.href}>{infoButton.label}</Button>
		</blockquote>
	);
}

function MotionElement({
	variants,
	initial,
	animate,
	children,
	className,
	custom,
}) {
	// Added custom prop to allow dynamic variant definitions
	return (
		<motion.div
			variants={variants}
			initial={initial}
			animate={animate}
			className={className}
			custom={custom}
		>
			{children}
		</motion.div>
	);
}

export default StaffPreview;
