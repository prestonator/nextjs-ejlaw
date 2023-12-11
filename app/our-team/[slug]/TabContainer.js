"use client";
import React, { useState, useEffect } from "react";
import { SafeHtml } from "@/utils/helperFunctions";
import styles from "./OurTeam.module.css";

const TabContainer = ({ tabs }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	useEffect(() => {
		setActiveTabIndex(0);
	}, []);

	const handleTabClick = (rowIndex) => {
		setActiveTabIndex(rowIndex);
	};
	return (
		<div className={styles.tabContainer}>
			{/* Tab Buttons */}
			<ul className={styles.tabButtonContainer}>
				{tabs?.map(({ title, id }, index) => (
					<li key={id} className={styles.tabButtonWrapper}>
						<button
							onClick={() => handleTabClick(index)}
							className={`${styles.tabButton} ${
								activeTabIndex === index ? styles.active : ""
							}`}
						>
							<span className={styles.tabButtonText} data-text={title}>
								{title.replace(/_/g, " ")}
							</span>
						</button>
					</li>
				))}
			</ul>
			{/* Tab content */}
			<ul className={styles.tabContentContainer}>
				{tabs?.map(
					({ content, id }, index) =>
						activeTabIndex === index && (
							<li key={id}>
								<div className={`${styles.tabContent} ${styles.active}`}>
									{SafeHtml(content)}
								</div>
							</li>
						)
				)}
			</ul>
		</div>
	);
};

export default TabContainer;
