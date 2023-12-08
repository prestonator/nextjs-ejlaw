"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ExpandCard.module.css";
import { SafeHtml } from "@/utils/helperFunctions";
import Button from "@/components/Buttons/MainButton/Button";

const ExpandCard = ({ isFirst, ...props }) => {
	const [expanded, setExpanded] = useState(isFirst || false);
	const cardRef = useRef();

	const handleClick = () => {
		setExpanded(!expanded);
	};

	const handleOutsideClick = (e) => {
		if (!cardRef.current.contains(e.target)) {
			setExpanded(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	return (
		<div ref={cardRef} className={styles.container}>
			<div
				className={`${styles.card} ${
					expanded ? styles.expanded : styles.closed
				}`}
				onClick={handleClick}
			>
				<div
					className={`${styles.face} ${styles.faceOne}`}
					style={{
						backgroundImage: `url(${props.image})`,
					}}
				>
					<div className={styles.contentContainer}>{SafeHtml(props.title)}</div>
				</div>
				<div className={`${styles.face} ${styles.faceTwo}`}>
					<div className={styles.contentContainer}>
						<div className={styles.content}>
							<p>{props.content}</p>
						</div>
						<Button href={props.href}>Learn More</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExpandCard;
