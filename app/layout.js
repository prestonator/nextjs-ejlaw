import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import GTM_Analytics from "@/components/Analytics/GTM_Analytics";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fetchData } from "@/lib/fetchData";
import { RootLayoutQuery } from "@/queries/rootLayout.graphql";
import FloatingButton from "@/components/ContactForm/FloatingButton";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import NavClient from "@/components/Nav/NavClient";
import { cormorant, montserrat, saira } from "@/lib/font";
import { Suspense } from 'react'
import Link from "next/link";

const getData = async () => {
	try {
		const { data } = await fetchData(RootLayoutQuery.loc.source.body);
		return data?.rootLayout?.data?.attributes || [];
	} catch (error) {
		console.error('Error fetching data:', error);
		throw new Error('Failed to fetch data'); // Throw an error to indicate the failure
	}
};


export const metadata = {
	metadataBase: new URL("https://www.eltonjenkinslaw.com"),
	title: "Elton Jenkins Law, P.L.L.C.",
	description:
		"Elton Jenkins Law, P.L.L.C. is a law firm in Oklahoma that specializes in criminal defense, family law, personal injury law, and mediation. The firm values honesty, integrity, and justice and prioritizes its clients. Contact us for a free consultation.",
	icons: {
		icon: [
			{ url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		shortcut: "/icons/favicon.ico",
		apple: "/icons/apple-touch-icon.png",
	},
};

export default async function RootLayout({ children }) {
	const { navMenu, logo, footer } = await getData();
	return (
		<html
			lang="en"
			className={`${cormorant.variable} ${montserrat.variable} ${saira.variable}`}
		>
			<body>
				<Suspense>
					<GTM_Analytics />
				</Suspense>
				
				<NavClient>
					<Nav navItems={navMenu} logo={logo} />
				</NavClient>
				{children}
				<Footer footer={footer} />
				<FloatingButton />
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}